import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const landingPagesApi = createApi({
  reducerPath: "landingPagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/landing-pages`
  }),
  endpoints: (builder) => ({
    getLandingPage: builder.query({
      query: (id: string) => `/${id}`
    })
  })
})

export const { useGetLandingPageQuery } = landingPagesApi
