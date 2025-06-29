import { useParams } from "react-router-dom"
import FormComponent from "./FormComponent"
import ImageContainer from "./ImageContainer"
import { IoMdStar } from "react-icons/io"
import { useGetProductQuery } from "../../services/productsService"

const Product = () => {
  const { id } = useParams()
  // @ts-ignore
  const { data, isLoading, error } = useGetProductQuery(id)

  return (
    !error &&
    !isLoading &&
    data.success && (
      <div className="w-full flex flex-col gap-2 pt-8 pb-8 md:px-18">
        <div className="flex items-center justify-center w-full text-gray-700 text-sm">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => window.history.back()}
          >
            Nos parfums
          </span>
          <span className="px-1">{">"}</span>
          <span>{data.data?.title} </span>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start justify-center">
          {/*  @ts-ignore */}
          <ImageContainer images={data.data?.images} />
          <div className="w-full flex flex-col gap-1 lg:gap-2 max-w-lg px-4 sm:px-1 ">
            <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold lg:mt-4">
              {data.data?.title}{" "}
            </h3>

            <div className="flex items-center text-yellow-500">
              <IoMdStar className="hover:scale-150 transition duration-200" />
              <IoMdStar className="hover:scale-150 transition duration-200" />
              <IoMdStar className="hover:scale-150 transition duration-200" />
              <IoMdStar className="hover:scale-150 transition duration-200" />
              <IoMdStar className="hover:scale-150 transition duration-200" />
            </div>
            {/* <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">Categorie :</span>
              <span>{product.type.toUpperCase()} </span>
            </div> */}

            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">Tags :</span>
              <span>Parfum </span>
            </div>
            <span className="text-red-900 font-bold text-xl sm:text-2xl">
              {data.data?.price} DA
            </span>

            <p className="text-sm sm:text-base text-gray-700">
              {data.data?.description}{" "}
            </p>
            {/*  @ts-ignore */}
            <FormComponent product={data.data} />
          </div>
        </div>
      </div>
    )
  )
}

export default Product
