import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import productsReducer from "./productsSlice"
import modalsReducer from "./modalsSlice"
import { productsApi } from "../services/productsService"
import { ordersApi } from "../services/ordersService"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    modals: modalsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, ordersApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
