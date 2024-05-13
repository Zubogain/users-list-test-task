import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../interfaces/users";

export const usersApi = createApi({
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://x8ki-letl-twmt.n7.xano.io/api:6_8FTBNX/users",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], string>({
      query: () => "",
      providesTags: ["Users"],
    }),
    getUser: builder.query<User, string>({
      query: (id) => `/${id}`,
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, User>({
      query: (user) => ({
        url: `/${user.id}`,
        method: "PUT",
        body: user,
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
  usePrefetch,
} = usersApi;
