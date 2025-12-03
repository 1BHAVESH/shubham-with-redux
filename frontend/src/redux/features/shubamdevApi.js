import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shubhamDevApi = createApi({
  reducerPath: "shubhamDevApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:3001/api",
    credentials: "include"
   }),
  endpoints: (builder) => ({
    mailSend: builder.mutation({
      query: (credentials) => ({
        url: "/mail/send-email",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useMailSendMutation } = shubhamDevApi;