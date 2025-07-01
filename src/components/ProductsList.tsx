import { useNavigate } from "react-router-dom"
// import { CiHeart } from "react-icons/ci"
// import { FaHeart } from "react-icons/fa"
import { IoMdStar } from "react-icons/io"
import { useLazyGetProductsQuery } from "../services/productsService"
import ProductListSkeleton from "./ProductListSkeleton"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../features/hooks"
import { setTotalPages } from "../features/productsSlice"

interface ProductListProps {
  tag: string
}

// @ts-ignore
const ProductsList = ({ tag }: ProductListProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [getProducts, { data, isLoading, error }] = useLazyGetProductsQuery()
  const { page } = useAppSelector((s) => s.products)

  useEffect(() => {
    fetchProducts()
  }, [page, tag]) //

  const fetchProducts = async () => {
    try {
      const res = await getProducts({ page, tag }).unwrap()
      dispatch(setTotalPages(res?.pagination?.totalPages))
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) return <ProductListSkeleton />

  if (error)
    return <div className="text-red-500 p-4">Failed to load products.</div>

  if (!data || !data.data) return <div className="p-4">No products found.</div>

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 py-4">
      {data.data.map((product: any) => {
        const { id, title, price, images } = product
        return (
          <div
            className="flex flex-col items-center justify-start p-4 "
            key={id}
          >
            <div
              className="overflow-hidden hover:cursor-pointer relative group"
              onClick={() => {
                window.scrollTo({ top: 0 })
                navigate("/product/" + id)
              }}
            >
              <img
                src={`${images[0].url}`}
                alt={title}
                className="hover:scale-110 transition duration-300 rounded border-gray-200 border shadow-2xl"
              />
            </div>
            <h3 className="text-center font-semibold text-base mt-2">
              {title}
            </h3>
            <div className="flex items-center justify-center text-yellow-500">
              {[...Array(5)].map((_, idx) => (
                <IoMdStar
                  key={idx}
                  className="hover:scale-150 transition duration-200"
                />
              ))}
            </div>
            <p className="font-bold text-base mt-1 text-red-900">{price} DA</p>
          </div>
        )
      })}
    </div>
  )
}

export default ProductsList
