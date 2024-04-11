import { AddOrderArgs, Order } from "@/Types/types";
import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// interface UpdateOrderArgs extends Partial<AddOrderArgs> {
//   id: string;
// }

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  tagTypes: ["Orders"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }) as BaseQueryFn,
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "orders",
      providesTags: (result) =>
        result ? [...result.map((order) => ({ type: 'Orders' as const, id: order.id })), { type: 'Orders', id: 'LIST' }] : [{ type: 'Orders', id: 'LIST' }],
    }),

    addOrder: builder.mutation<string, AddOrderArgs>({
      query: (newOrderData) => {
        // console.log('Request body:', newOrderData);
        return {
          url: "orders",
          method: "POST",
          body: newOrderData,
        };
      },
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    

    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    clearOrdersHistory: builder.mutation<void, void>({
      query: () => ({
        url: "orders",
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useDeleteOrderMutation,
  useClearOrdersHistoryMutation,
} = ordersApi;
