import { useParams } from "react-router-dom"
import FormComponent from "./FormComponent"
import ImageContainer from "./ImageContainer"
import { IoMdStar } from "react-icons/io"
import { useGetProductQuery } from "../../services/productsService"
import ProductSkeleton from "./ProductSkeleton"
import { useEffect, useState } from "react"

const Product = () => {
  const { id } = useParams()
  const {
    data,
    isLoading,
    error
    // @ts-ignore
  } = useGetProductQuery(id)

  const [form, setForm] = useState({
    shopName: "lk-parfumo",
    productName: "",
    productId: "",
    fullName: "",
    phoneNumber: "",
    state: "Alger",
    stateNumber: 16,
    city: "",
    // @ts-ignore
    price: 0,
    shippingMethod: "Domicile",
    shippingPrice: 500,
    totalPrice: 0,
    quantity: 1,
    // @ts-ignore
    variants: [],
    selectedVariantItem: {}
  })

  useEffect(() => {
    if (!isLoading && data?.success) {
      const variants = data.data?.variants || []
      if (variants.length > 0 && Array.isArray(variants[0].variantItems)) {
        const variantItems = variants[0].variantItems

        // Try to find "30ml" variant, otherwise pick the first one
        const foundVariant =
          variantItems.find((item: any) => item.value === "30ml") ||
          variantItems[0]

        if (foundVariant && foundVariant.price) {
          setForm((prev) => ({
            ...prev,
            productName: data.data.title,
            productId: data.data.productId,
            variants: variants,
            selectedVariantItem: foundVariant,
            price: foundVariant.price,
            totalPrice: foundVariant.price + prev.shippingPrice
          }))
        } else {
          console.error("No valid variant found — check product data.")
        }
      } else {
        console.error(
          "Product has no variants or variantItems — check product data."
        )
      }
    }
  }, [isLoading, data])

  useEffect(() => {
    window.ttq &&
      // @ts-ignore
      window.ttq.track("ViewContent", {
        contents: [
          {
            content_id: id,
            content_type: "product",
            content_name: "product"
          }
        ],
        value: "1900",
        currency: "DZA"
      })
  }, [id])

  if (isLoading) return <ProductSkeleton />

  return (
    !error &&
    !isLoading &&
    data?.data && (
      <div className="flex flex-col gap-8">
        <div className="w-full flex flex-col gap-2 pt-8 pb-8 md:px-18">
          <div className="flex items-center justify-center w-full text-gray-700 text-sm">
            <span
              className="hover:underline cursor-pointer"
              onClick={() => window.history.back()}
            >
              Nos parfums
            </span>
            <span className="px-1">{">"}</span>
            <span>{data?.data.title} </span>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start justify-center">
            {/*  @ts-ignore */}
            <ImageContainer images={data?.data.images} />
            <div className="w-full flex flex-col gap-1 lg:gap-2 max-w-lg px-4 sm:px-1 ">
              <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold lg:mt-4">
                {data?.data.title}{" "}
              </h3>

              <div className="flex items-center text-yellow-500">
                <IoMdStar className="hover:scale-150 transition duration-200" />
                <IoMdStar className="hover:scale-150 transition duration-200" />
                <IoMdStar className="hover:scale-150 transition duration-200" />
                <IoMdStar className="hover:scale-150 transition duration-200" />
                <IoMdStar className="hover:scale-150 transition duration-200" />
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Tags :</span>
                <span>Parfum </span>
              </div>
              <span className="text-red-900 font-bold text-xl sm:text-2xl">
                {/* @ts-ignore */}
                {form?.selectedVariantItem?.price} DA
              </span>

              <p className="text-sm sm:text-base text-gray-700">
                {data?.data.description}{" "}
              </p>
              {/*  @ts-ignore */}
              <FormComponent product={data} form={form} setForm={setForm} />
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Product
