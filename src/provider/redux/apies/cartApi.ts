import { AddCartItemArgs, CartItem, UpdateCartItemArgs } from "@/Types/cart_types";
import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath: "cartApi",
    tagTypes: ["Cart"],
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }) as BaseQueryFn,
    endpoints: (builder) => ({
        getCartItems: builder.query<CartItem[], void>({
            query: () => "cart",
            providesTags: (result) =>
                result ? [...result.map((order) => ({ type: 'Cart' as const, id: order.id })), { type: 'Cart', id: 'LIST' }] : [{ type: 'Cart', id: 'LIST' }],
        }),

        addCartItem: builder.mutation<void, AddCartItemArgs>({
            query: (newCartItemData) => ({
                url: "cart",
                method: "POST",
                body: newCartItemData,
            }),
            invalidatesTags: ["Cart"],
        }),

        deleteCartItem: builder.mutation<void, string>({
            query: (id) => ({
                url: `cart/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),

        updateCartItem: builder.mutation<void, UpdateCartItemArgs>({
            query: ({ id, ...quantity }) => {
                if (quantity === undefined || quantity === null) {
                    console.log('Quantity aybay!', quantity);

                }
                return {
                    url: `cart/${id}`,
                    method: "PATCH",
                    body: { quantity },
                };
            },
            invalidatesTags: ["Cart"],
        }),
        clearCart: builder.mutation<void, void>({
            query: () => ({
                url: "cart",
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetCartItemsQuery,
    useAddCartItemMutation,
    useDeleteCartItemMutation,
    useUpdateCartItemMutation,
    useClearCartMutation
} = cartApi;
