import { useEffect, useState } from "react"
import { FaMapSigns, FaPhoneAlt } from "react-icons/fa"
import { IoPerson } from "react-icons/io5"
import ShippingForm from "./ShippingForm"
import { BsFillSignpostFill } from "react-icons/bs"
// import Offers from "./Offers"
import { BiChevronDown } from "react-icons/bi"
import { tarifs, cities, bureaux } from "../../data.ts"
import { useAppDispatch } from "../../features/hooks.ts"
import { useCreateOrderMutation } from "../../services/ordersService.ts"
import QauntityComponent from "./QauntityComponent.tsx"
import { setIsSuccessModalOpen } from "../../features/modalsSlice.ts"
import Variants from "./Variants.tsx"
// import { useModalsStore } from "../../store/modalsStore"
// import { useProductsStore } from "../../store/productsStore"
// import { createOrder } from "../../services/orders"
// import { useModalsStore } from "../../store/modalsStore"
// import ReactPixel from "react-facebook-pixel"

interface FormErrors {
  fullName?: string
  phoneNumber?: string
  state?: string
  city?: string
  shippingMethod?: string
}

interface FormComponentProps {
  product: Product
  form: any
  setForm: (form: any) => void
}

interface Product {
  title: string
  iamges: string[]
  price: number
}

const FormComponent = ({ product, form, setForm }: FormComponentProps) => {
  const dispatch = useAppDispatch()
  const [createOrder, { error, isLoading }] = useCreateOrderMutation()
  // const { product } = useAppSelector((state) => state.products)

  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    phoneNumber: "",
    state: "",
    city: "",
    shippingMethod: ""
  })

  useEffect(() => {
    setForm((prev: any) => ({
      ...prev,
      shippingPrice: Number(
        // @ts-ignore
        tarifs[Number(form?.stateNumber) - 1][form.shippingMethod]
      ),
      totalPrice:
        Number(form?.selectedVariantItem.price) * prev.quantity +
        // @ts-ignore
        Number(tarifs[Number(form.stateNumber) - 1][form.shippingMethod])
    }))
  }, [
    form.state,
    form.city,
    form.shippingMethod,
    form.shippingPrice,
    form.price,
    form.quantity,
    product,
    form.selectedVariantItem
  ])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === "state") {
      // @ts-ignore
      const selectedOptions = e.target.selectedOptions[0]
      const stateNumber = selectedOptions.getAttribute("data-idwilaya")

      setForm((prev: any) => ({
        ...prev,
        state: value,
        stateNumber: Number(stateNumber) || ""
      }))
    } else {
      setForm((prev: any) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      handleCreateOrder()
    }
  }

  const handleCreateOrder = async () => {
    const res = await createOrder({
      ...form,
      variant: form.selectedVariantItem.value
    }).unwrap()
    if (res.success) {
      // show success modal
      dispatch(
        setIsSuccessModalOpen({
          isSuccessModalOpen: true,
          orderedProductTitle: product.title
        })
      )
      if (window.fbq) {
        window.fbq("track", "Purchase", {
          value: form.totalPrice,
          currency: "DZA"
        })
      }
      // @ts-ignore
      window.ttq &&
        // @ts-ignore
        window.ttq.track("Purchase", {
          value: form.totalPrice,
          currency: "DZA"
        })
    }
  }

  const isValidPhoneNumber = (phone: string) => {
    const regex = /^(05|06|07)\d{8}$/
    return regex.test(phone)
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!form.fullName.trim()) {
      newErrors.fullName = "يجب عليك كتابة اسمك"
    }

    if (!form.phoneNumber.trim() || form.phoneNumber.length < 9) {
      newErrors.phoneNumber = "يجب عليك كتابة رقمك"
    }

    if (form.phoneNumber.length > 1 && !isValidPhoneNumber(form.phoneNumber)) {
      newErrors.phoneNumber = "يجب عليك كتابة رقم صحيح"
    }

    if (!form.state.trim()) {
      newErrors.state = "يجب عليك كتابة ولايتك"
    }

    if (!form.city.trim()) {
      newErrors.city = "يجب عليك كتابة مدينتك"
    }

    if (
      tarifs[Number(form?.stateNumber) - 1]["Stopdesk"] === "0" &&
      form.shippingMethod === "Stopdesk"
    ) {
      newErrors.shippingMethod = "يجب عليك اختيار طريقة شحن صالحة"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-2 mt-4 rtl"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="fullName">الاسم الكامل :</label>
        <div className="relative w-full">
          <input
            type="text"
            name="fullName"
            value={form.fullName || ""}
            onChange={handleChange}
            maxLength={20}
            minLength={3}
            className="border-2 border-gray-700 outline-0 pt-2 pb-2.5 pr-16 w-full rounded"
          />
          <IoPerson className="absolute top-1/2  right-4 -translate-y-1/2 text-xl" />
        </div>
        {errors.fullName && (
          <span className="text-red-500 text-base">{errors.fullName} </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="phoneNumber">رقم الهاتف :</label>
        <div className="relative w-full">
          <input
            maxLength={10}
            minLength={10}
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber || ""}
            onChange={handleChange}
            className="border-2 border-gray-700 outline-0 pt-2 pb-2.5 pr-16 w-full rtl rounded"
          />
          <FaPhoneAlt className="absolute top-1/2  right-4 -translate-y-1/2 text-xl" />
        </div>
        {errors.phoneNumber && (
          <span className="text-red-500 text-base">{errors.phoneNumber} </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="fullName">الولاية :</label>
        <div className="relative w-full">
          <select
            name="state"
            value={form?.state}
            className="border-2 border-gray-700 outline-0 pt-2 pb-2.5 pr-16 w-full appearance-none rounded"
            onChange={handleChange}
          >
            {tarifs &&
              tarifs?.map((tarif, i) => {
                const { IDWilaya, Wilaya, Domicile } = tarif
                if (Domicile !== "0") {
                  return (
                    <>
                      <option value={Wilaya} key={i} data-idwilaya={IDWilaya}>
                        {IDWilaya}-{Wilaya}
                      </option>
                    </>
                  )
                }
              })}
          </select>
          <BiChevronDown
            className="absolute top-1/2  left-1 -translate-y-1/2"
            size={26}
          />
          <FaMapSigns className="absolute top-1/2  right-4 -translate-y-1/2 text-xl" />
        </div>
        {errors.state && (
          <span className="text-red-500 text-base">{errors.state} </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="city">البلدية :</label>
        <div className="relative w-full">
          {form.shippingMethod === "Domicile" ? (
            <select
              name="city"
              value={form?.city}
              className="border-2 border-gray-700 outline-0 pt-2 pb-2.5 pr-16 w-full appearance-none rounded"
              onChange={handleChange}
            >
              {form.state !== "" &&
                cities
                  ?.filter(
                    (c) => Number(c?.wilaya_code) === Number(form.stateNumber)
                  )
                  ?.map((c, i) => {
                    const { commune_name_ascii: commune } = c
                    return (
                      <>
                        <option value={commune} key={i}>
                          {commune}
                        </option>
                      </>
                    )
                  })}
            </select>
          ) : (
            <select
              name="city"
              value={form?.city}
              className="border-2 border-gray-700 outline-0 pt-2 pb-2.5 pr-16 w-full appearance-none rounded"
              onChange={handleChange}
            >
              {form.state !== "" &&
                bureaux
                  ?.filter(
                    (b) => Number(b?.stateNumber) === Number(form.stateNumber)
                  )
                  ?.map((b) => {
                    const { headquarters } = b
                    return (
                      <>
                        {headquarters.map((h, i) => (
                          <option value={h} key={i}>
                            {h}
                          </option>
                        ))}
                      </>
                    )
                  })}
            </select>
          )}
          <BiChevronDown
            className="absolute top-1/2  left-1 -translate-y-1/2"
            size={26}
          />
          <BsFillSignpostFill className="absolute top-1/2  right-4 -translate-y-1/2 text-xl" />
        </div>
        {errors.city && (
          <span className="text-red-500 text-base">{errors.city} </span>
        )}
      </div>

      <Variants form={form} setForm={setForm} />

      <QauntityComponent form={form} setForm={setForm} />

      <ShippingForm form={form} setForm={setForm} tarifs={tarifs} />
      {errors.shippingMethod && (
        <span className="text-red-500 text-base">{errors.shippingMethod} </span>
      )}

      <div className="flex items-center justify-between gap-2 w-full pt-4">
        <span className="">المجموع :</span>
        <span>{form?.totalPrice} د.ج</span>
      </div>

      {error && <span className="text-red-500">Internal Server Error</span>}

      <button
        className="flex items-center justify-center px-8 pt-2 pb-2.5 border border-gray-500 font-bold text-lg text-white bg-black hover:scale-105 hover:border-green-500 animate-bounce transition duration-300 cursor-pointer mt-8 rounded"
        type="submit"
      >
        {isLoading ? "..." : "احصل عليه الآن"}
      </button>
    </form>
  )
}

export default FormComponent
