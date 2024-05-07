import { AddOrderArgs, Order } from "@/Types/types";
import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  tagTypes: ["Orders"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }) as BaseQueryFn,
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], { customerId: string }>({
      query: ({ customerId }) => {
        return {
          url: 'orders',
          method: 'GET',
          params: { customerId },
        };
      },
      providesTags: (result) =>
        result ? [...result.map((order) => ({ type: 'Orders' as const, id: order.id })), { type: 'Orders', id: 'LIST' }] : [{ type: 'Orders', id: 'LIST' }],
    }),

    addOrder: builder.mutation<string, AddOrderArgs>({
      query: (newOrderData) => {
        return {
          url: "orders",
          method: "POST",
          body: newOrderData,
          credentials: 'include', 
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

  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
