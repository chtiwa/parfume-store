import { useNavigate } from "react-router-dom"
import { getProducts } from "../features/productsFeatures"
// import { CiHeart } from "react-icons/ci"
// import { FaHeart } from "react-icons/fa"
import { IoMdStar } from "react-icons/io"

interface ProductListProps {
  filter: string
}

const ProductsList = ({ filter }: ProductListProps) => {
  const products = getProducts(filter)
  const navigate = useNavigate()

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 py-4">
      {products &&
        products.map((product) => {
          const { id, title, price, images } = product
          return (
            <div
              className="flex flex-col items-center justify-center p-4 "
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
                  src={`/${images[0]}`}
                  alt={title}
                  className="hover:scale-110 transition duration-300 rounded border-gray-200 border shadow-2xl"
                />
              </div>
              <h3 className="font-semibold text-lg sm:text-xl mt-2">{title}</h3>
              <div className="flex items-center justify-center text-yellow-500">
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
                <IoMdStar />
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
}

export default ProductsList
