import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shubhamDevApi = createApi({
  reducerPath: "shubhamDevApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:3001/api",
    credentials: "include"
   }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    mailSend: builder.mutation({
      query: (credentials) => ({
        url: "/mail/send-email",
        method: "POST",
        body: credentials,
      }),
    }),
    getProjects: builder.query({
      query: () => "/projects",
      providesTags: ["Project"],
    }),
    getProjectBySlug: builder.query({
      query: (slug) => `/projects/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Project", id: slug }],
    }),
    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),
  }),
});

export const { 
  useMailSendMutation,
  useGetProjectsQuery,
  useGetProjectBySlugQuery,
  useGetProjectByIdQuery,
} = shubhamDevApi;