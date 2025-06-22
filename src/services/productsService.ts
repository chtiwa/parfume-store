import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query"

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/products`
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page: number) => `?page=${page}`
    }),
    getProduct: builder.query({
      query: (id: string) => `/${id}`
    })
  })
})

export const { useGetProductsQuery, useGetProductQuery } = productsApi
