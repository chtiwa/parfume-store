import { useParams } from "react-router-dom"
import { getProduct } from "../../features/productsFeatures"
import FormComponent from "./FormComponent"
import ImageContainer from "./ImageContainer"
import { useEffect } from "react"
import { setProduct } from "../../features/productsSlice"
import { useAppDispatch } from "../../features/hooks"
import { IoMdStar } from "react-icons/io"

const Product = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  // const navigate = useNavigate()
  const product = getProduct(Number(id))

  useEffect(() => {
    dispatch(setProduct(product))
  }, [product])

  return (
    product && (
      <div className="w-full flex flex-col gap-2 pt-8 pb-8 md:px-18">
        <div className="flex items-center justify-center w-full text-gray-700 text-sm">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => window.history.back()}
          >
            Nos produits
          </span>
          <span className="px-1">{">"}</span>
          <span>{product?.title} </span>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start justify-center">
          {/*  @ts-ignore */}
          <ImageContainer images={product?.images} />
          <div className="flex flex-col gap-1 lg:gap-2 max-w-lg px-4 sm:px-1 ">
            <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold lg:mt-4">
              {product?.title}{" "}
            </h3>

            <div className="flex items-center text-yellow-500">
              <IoMdStar className="hover:scale-150 transition duration-200" />
              <IoMdStar className="hover:scale-150 transition duration-200" />
              <IoMdStar className="hover:scale-150 transition duration-200" />
              <IoMdStar className="hover:scale-150 transition duration-200" />
              <IoMdStar className="hover:scale-150 transition duration-200" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">Categorie :</span>
              <span>{product.type.toUpperCase()} </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">Tags :</span>
              <span>Parfum </span>
            </div>
            <span className="text-red-900 font-bold text-xl sm:text-2xl">
              {product?.price} DA
            </span>

            <p className="text-sm sm:text-base text-gray-700">
              {product?.description}{" "}
            </p>
            {/*  @ts-ignore */}
            {product && <FormComponent />}
          </div>
        </div>
      </div>
    )
  )
}

export default Product
