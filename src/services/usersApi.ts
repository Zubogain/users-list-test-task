import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../interfaces/users";
import { z } from "zod";
import { UserFormSchema } from "@/schemas/form";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://x8ki-letl-twmt.n7.xano.io/api:6_8FTBNX/users",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], string | undefined>({
      query: () => "",
      providesTags: ["Users"],
    }),
    getUser: builder.query<User, string | undefined>({
      query: (id) => `/${id}`,
      providesTags: ["Users"],
    }),
    createUser: builder.mutation<User, z.infer<typeof UserFormSchema>>({
      query: (user) => ({
        url: "",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<User, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, z.infer<typeof UserFormSchema>>({
      query: (user) => ({
        url: `/${user.id}`,
        method: "PUT",
        body: { user_id: user.id, ...user },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
  // Consider adding refetchOnMount or refetchOnReconnect based on your needs
});

// Automatic hook generation
export const {
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  usePrefetch,
} = usersApi;
