import { useNavigate } from "react-router-dom"
import { getProducts } from "../features/productsFeatures"

const ProductsList = () => {
  const products = getProducts()
  const navigate = useNavigate()

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 py-4">
      {products &&
        products.map((product) => {
          const { id, title, price, images } = product
          return (
            <div
              className="flex flex-col items-center justify-center p-4"
              key={id}
            >
              <div
                className="overflow-hidden hover:cursor-pointer"
                onClick={() => {
                  window.scrollTo({ top: 0 })
                  navigate("/product/" + id)
                }}
              >
                <img
                  src={`/${images[0]}`}
                  alt={title}
                  className="hover:scale-110 transition duration-300"
                />
              </div>
              <h3 className="altfont mt-2">{title}</h3>
              <p className="font-semibold mt-1 text-sm text-red-900">
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
