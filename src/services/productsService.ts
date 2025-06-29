import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/products`
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      // @ts-ignore
      query: (page: number, category: string) =>
        `?page=${page}&categoryId=${category}`
    }),
    getProduct: builder.query({
      query: (id: string) => `/${id}`
    }),
    getProductsBySearch: builder.query({
      query: (search: string) => `/search?search=${search}`
    })
  })
})

// @ts-ignore
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useLazyGetProductsBySearchQuery
} = productsApi
