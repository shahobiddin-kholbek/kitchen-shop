import { AdminType, SignInAdmin } from "@/Types/admin_types";
import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
    reducerPath: "adminApi",
    tagTypes: ["Admin"],
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }) as BaseQueryFn,
    endpoints: (builder) => ({
        addAdmin: builder.mutation<string, AdminType>({
            query: (newAdminData) => ({
                url: "admin/signup",
                method: "POST",
                body: newAdminData,
            }),
            invalidatesTags: [{ type: "Admin", id: "LIST" }],
        }),
        signInAdmin: builder.mutation<{admin: AdminType}, SignInAdmin>({
            query: ({ email, password }) => ({
                url: "admin/signin",
                method: "POST",
                body: { email, password },
            }),
            invalidatesTags: [{ type: "Admin", id: "LIST" }],
            
        })
    })
})

export const { useAddAdminMutation, useSignInAdminMutation } = adminApi;