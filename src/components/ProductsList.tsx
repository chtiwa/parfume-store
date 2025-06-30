import { useNavigate } from "react-router-dom"
// import { CiHeart } from "react-icons/ci"
// import { FaHeart } from "react-icons/fa"
import { IoMdStar } from "react-icons/io"
import { useGetProductsQuery } from "../services/productsService"
import ProductListSkeleton from "./ProductListSkeleton"

interface ProductListProps {
  tag: string
}

// @ts-ignore
const ProductsList = ({ tag }: ProductListProps) => {
  const { data, isLoading, error } = useGetProductsQuery({ page: 1, tag: tag })

  const navigate = useNavigate()

  if (isLoading) return <ProductListSkeleton /> // product list skeleton

  return (
    !isLoading &&
    !error && (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 py-4">
        {data.data &&
          // @ts-ignore
          data.data.map((product) => {
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
                  {/* <span className="z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-2 right-2">
                  <CiHeart className="text-red-500 hover:hidden" size={30} />
                  <FaHeart
                    className="text-red-500 hidden hover:flex"
                    size={28}
                  />
                </span> */}
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
                  <IoMdStar className="hover:scale-150 transition duration-200" />
                  <IoMdStar className="hover:scale-150 transition duration-200" />
                  <IoMdStar className="hover:scale-150 transition duration-200" />
                  <IoMdStar className="hover:scale-150 transition duration-200" />
                  <IoMdStar className="hover:scale-150 transition duration-200" />
                </div>
                <p className="font-bold text-base mt-1 text-red-900">
                  {price}
                  {" DA"}
                </p>
              </div>
            )
          })}
      </div>
    )
  )
}

export default ProductsList
