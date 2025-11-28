import { useLocation, useParams } from "react-router-dom"
import FormComponent from "./FormComponent"
import { useEffect, useState } from "react"
import LandingPageSkeleton from "./LandingPageSkeleton"
import SuccessModal from "../../components/SuccessModal"
import ScrollButton from "./ScrollButton"
import MetaPixel from "../../components/MetaPixel"
import { useGetLandingPageQuery } from "@/services/landingPagesService"

const LandingPage = () => {
  // get the landing page by id
  const location = useLocation()
  const { id } = useParams()
  // @ts-ignore
  const { data, isLoading, error } = useGetLandingPageQuery(id)

  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView")
    }
  }, [location])

  const [form, setForm] = useState({
    shopName: "riva-home",
    productName: "",
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
    selectedVariantItem: [],
    selectedVariantItems: []
  })

  useEffect(() => {
    if (!isLoading && data?.success) {
      const variants = data.data?.product?.variants || []
      if (variants.length > 0 && Array.isArray(variants[0].variantItems)) {
        const variantItems = variants[0].variantItems

        const foundVariant = variantItems[0]

        if (foundVariant && foundVariant.price) {
          setForm((prev) => ({
            ...prev,
            productName: data.data.title,
            variants: variants,
            selectedVariantItem: foundVariant,
            price: foundVariant.price,
            totalPrice: foundVariant.price + prev.shippingPrice
          }))
        } else {
          console.error("No valid variant found - check the product data.")
        }
      } else {
        console.log(
          "Product has no variants or variantItems - check the product data"
        )
      }
    }
  }, [isLoading, data])

  if (isLoading) return <LandingPageSkeleton />

  return (
    <>
      <SuccessModal />
      <MetaPixel />

      <div className="flex flex-col gap-4 items-center justify-center pb-8 relative">
        <ScrollButton />
        <div className="flex flex-col gap-1">
          {data.data.images.map((image: any) => {
            const { url, id } = image
            return (
              <img
                src={url}
                alt={`${data.data.title}-${id}`}
                key={id}
                className="object-contain"
              />
            )
          })}
        </div>

        <div className="flex flex-col gap-2 w-full items-center justify-center">
          <FormComponent
            product={data?.data?.product}
            // @ts-ignore
            form={form}
            // @ts-ignore
            setForm={setForm}
          />
        </div>
      </div>
    </>
  )
}

export default LandingPage
