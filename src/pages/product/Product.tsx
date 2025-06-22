import { useNavigate, useParams } from "react-router-dom"
import { getProduct } from "../../features/productsFeatures"
import FormComponent from "./FormComponent"
import ImageContainer from "./ImageContainer"
import { useEffect } from "react"
import { useProductsStore } from "../../store/productsStore"

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setProduct } = useProductsStore((s) => s)
  const product = getProduct(Number(id))

  useEffect(() => {
    setProduct(product)
  }, [product])

  return (
    product && (
      <div className="w-full flex flex-col gap-8 pb-8 md:px-18">
        <div className="flex items-center justify-center w-full text-gray-700">
          <span>{product?.title} </span>
          <span className="px-1">{"<"}</span>
          <span
            className="hover:text-green-500 hover:underline cursor-pointer"
            onClick={() => navigate("/products")}
          >
            منتجاتنا
          </span>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start justify-center">
          {/*  @ts-ignore */}
          <ImageContainer images={product?.images} />
          <div className="flex flex-col gap-2 lg:gap-6 max-w-lg px-4 sm:px-1 ">
            <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold lg:mt-4">
              {product?.title}{" "}
            </h3>
            <span className="text-green-700 font-bold text-xl sm:text-2xl">
              {product?.price} د.ج
            </span>
            <p className="text-base lg:text-lg">{product?.description} </p>
            {/*  @ts-ignore */}
            {product && <FormComponent />}
          </div>
        </div>
      </div>
    )
  )
}

export default Product
