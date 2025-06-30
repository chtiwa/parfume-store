import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/products`
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      // @ts-ignore
      query: ({ page, tag }) => {
        const params = new URLSearchParams()
        params.set("page", page.toString())
        if (tag) params.set("tag", tag)
        return `?${params.toString()}`
      }
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
