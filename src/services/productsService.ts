import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/products`
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      // @ts-ignore
      query: ({ page, tag, brand }) => {
        const params = new URLSearchParams()
        if (page) params.set("page", page?.toString())
        if (tag) params.set("tag", tag)
        if (brand) params.set("brand", brand)
        return `/client?${params.toString()}`
      }
    }),
    getPromoRemaining: builder.query({
      query: () => `/promo`
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
  useLazyGetProductsQuery,
  useGetPromoRemainingQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useLazyGetProductsBySearchQuery
} = productsApi
