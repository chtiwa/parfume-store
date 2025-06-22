import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/orders`
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (form) => ({
        url: "",
        method: "POST",
        body: JSON.stringify(form)
      })
    })
  })
})

export const { useCreateOrderMutation } = ordersApi
