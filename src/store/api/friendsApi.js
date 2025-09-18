import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFriends: builder.query({
      query: (id) => ({
        url: "/friends",
        method: "GET",
        params: { userId: id },
      }),
    }),
    getFriend: builder.query({
      query: (friendId) => ({
        url: `/friends/${friendId}`,
        method: "GET",
      }),
    }),
    deleteFriend: builder.mutation({
      query: (friendId) => ({
        url: `/friends/${friendId}`,
        method: "DELETE",
      }),
    }),
    addFriend: builder.mutation({
      query: (userId) => ({
        url: "/friends",
        method: "POST",
        body: {
          name: faker.person.firstName(),
          userId: userId,
        },
      }),
    }),
    editFriend: builder.mutation({
      query: ({ friendId, name, userId }) => ({
        url: `/friends/${friendId}`,
        method: "PUT",
        body: { name, userId },
      }),
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useGetFriendQuery,
  useDeleteFriendMutation,
  useAddFriendMutation,
  useEditFriendMutation,
} = friendsApi;
