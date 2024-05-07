import { GetProductsArgs, Product } from "@/Types/types";
import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";

interface AddProductArgs {
  name: string;
  category: string;
  price: number;
  rating: string;
  description: string;
  img: string[];
}

interface UpdateProductArgs extends Partial<AddProductArgs> {
  id: string;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }) as BaseQueryFn,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], GetProductsArgs>({
      query: ({ category, sortByPrice, searchValue, minPrice, maxPrice }) => {
        let url = "products?";
        if (category !== undefined) {
          url += `category=${category}&`;
        }
        if (sortByPrice !== undefined) {
          url += `sortByPrice=${sortByPrice}&`;
        }
        if (searchValue !== undefined) {
          url += `searchValue=${searchValue}&`;
        }
        if (minPrice !== undefined) {
          url += `minPrice=${minPrice}&`;
        }
        if (maxPrice !== undefined) {
          url += `maxPrice=${maxPrice}&`;
        }
        return { url };
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }: any) => ({ type: 'Products' as const, id })),
            { type: 'Products', id: 'LIST' },
          ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}`,

      providesTags: (result) =>
        result
          ? [{ type: 'Products' as const, id: result.id }]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    addProduct: builder.mutation<string, AddProductArgs>({
      query: (newProductData) => ({
        url: "products",
        method: "POST",
        body: newProductData,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation<void, UpdateProductArgs>({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Products"],
    }),
  }),

});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductQuery
} = productsApi;

