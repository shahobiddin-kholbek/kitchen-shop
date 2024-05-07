
import { User, UserSignIn } from "@/Types/user_types";
import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001/" }) as BaseQueryFn,
  endpoints: (builder) => ({
    addUser: builder.mutation<{ user: User }, User>({
      query: (newUserData) => ({
        url: "users/signup",
        method: "POST",
        body: newUserData,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    signinUser: builder.mutation<{ user: User }, UserSignIn>({
      query: ({ email, password }) => ({
        url: 'users/signin',
        method: "POST",
        body: { email, password },
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],

    }),

    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: 'users/logout',
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    })

  }),
});

export const {
  useAddUserMutation,
  useSigninUserMutation,
  useLogoutUserMutation
} = usersApi;
