import { create } from "zustand"

interface Product {
  id: number
  title: string
  description: string
  price: number
  oldPrice: number
  images: string[]
}

interface useProductsState {
  products: Product[]
  product: Product | undefined
  setProducts: (products: Product[]) => void
  setProduct: (product: Product | undefined) => void
}

export const useProductsStore = create<useProductsState>((set) => ({
  products: [],
  product: undefined,
  setProducts: (products) => set(() => ({ products: products })),
  setProduct: (product) => set(() => ({ product: product }))
}))
