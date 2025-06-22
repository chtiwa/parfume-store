import { createSlice } from "@reduxjs/toolkit"

// add pagination also
interface ProductsProps {
  products: any
  product: any
  page: number
  totalPages: number
}

const initialState: ProductsProps = {
  products: [],
  product: {},
  page: 1,
  totalPages: 1
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setProduct: (state, action) => {
      state.product = action.payload
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    }
  }
})

export const { setProducts, setProduct, setTotalPages, setPage } =
  productsSlice.actions

export default productsSlice.reducer
