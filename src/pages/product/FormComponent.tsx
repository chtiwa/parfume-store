import { useEffect, useState } from "react"
import { FaMapSigns, FaPhoneAlt } from "react-icons/fa"
import { IoPerson } from "react-icons/io5"
import ShippingForm from "./ShippingForm"
import { BsFillSignpostFill } from "react-icons/bs"
// import Offers from "./Offers"
import { BiChevronDown } from "react-icons/bi"
import { tarifs, cities } from "../../data.ts"
import { useAppDispatch, useAppSelector } from "../../features/hooks.ts"
import Offers from "./Offers.tsx"
import { useCreateOrderMutation } from "../../services/ordersService.ts"
import QauntityComponent from "./QauntityComponent.tsx"
import { setIsSuccessModalOpen } from "../../features/modalsSlice.ts"
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

const FormComponent = () => {
  const dispatch = useAppDispatch()
  const [createOrder, { error, isLoading }] = useCreateOrderMutation()
  const product = useAppSelector((state) => state.products.product)
  // const setIsPopupOpen = useModalsStore((state) => state.setIsPopupOpen)

  const [form, setForm] = useState({
    shopName: "lk-parfumo",
    productName: product && product?.title,
    fullName: "",
    phoneNumber: "",
    state: "Alger",
    stateNumber: 16,
    city: "",
    // @ts-ignore
    price: product && product.price,
    shippingMethod: "Stopdesk",
    shippingPrice: 370,
    totalPrice: product && product?.price + 370,
    quantity: 1,
    variant: "100ml"
  })

  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    phoneNumber: "",
    state: "",
    city: "",
    shippingMethod: ""
  })

  useEffect(() => {
    let factor = 1
    if (form.variant === "100ml") {
      factor = 1
    } else if (form.variant === "50ml") {
      factor = 0.5
    } else {
      factor = 0.3
    }
    setForm((prev) => ({
      ...prev,
      totalPrice:
        Number(product?.price) * factor * prev.quantity +
        // @ts-ignore
        Number(tarifs[Number(form?.stateNumber) - 1][form?.shippingMethod])
    }))
  }, [
    form.state,
    form.shippingMethod,
    form.price,
    form.quantity,
    product,
    form.variant
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
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      // console.log(form)
      handleCreateOrder()
      // createOrder(form).then((data) => {
      //   //   setIsPopupOpen(true)
      //   //
      // })
    }
  }

  const handleCreateOrder = async () => {
    const res = await createOrder(form).unwrap()
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
    }
  }

  const validateForm = () => {
    // TODO : validate phone number
    const newErrors: FormErrors = {}

    if (!form.fullName.trim()) {
      newErrors.fullName = "يجب عليك كتابة اسمك"
    }

    if (!form.phoneNumber.trim() || form.phoneNumber.length < 9) {
      newErrors.phoneNumber = "يجب عليك كتابة رقمك"
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
    console.log(errors)

    return Object.keys(newErrors).length === 0
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-2 mt-4 rtl"
    >
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="fullName">الاسم الكامل :</label>
        <div className="relative w-full">
          <input
            type="text"
            name="fullName"
            value={form.fullName || ""}
            onChange={handleChange}
            maxLength={20}
            minLength={3}
            className="border border-gray-700 outline-0 pt-2 pb-2.5 pr-16 w-full rounded"
          />
          <IoPerson className="absolute top-1/2  right-4 -translate-y-1/2 text-xl" />
        </div>
        {errors.fullName && (
          <span className="text-red-500 text-sm">{errors.fullName} </span>
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
            className="border border-gray-700 outline-0 pt-2 pb-2.5 pr-16 w-full rtl rounded"
          />
          <FaPhoneAlt className="absolute top-1/2  right-4 -translate-y-1/2 text-xl" />
        </div>
        {errors.phoneNumber && (
          <span className="text-red-500 text-sm">{errors.phoneNumber} </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="fullName">الولاية :</label>
        <div className="relative w-full">
          <select
            name="state"
            value={form?.state}
            className="border border-gray-700 outline-0 pt-2 pb-2.5 pr-16 w-full appearance-none rounded"
            onChange={handleChange}
          >
            {tarifs &&
              tarifs?.map((tarif, i) => {
                const { IDWilaya, Wilaya, Domicile } = tarif
                if (Domicile === "0") return <></>
                return (
                  <>
                    <option value={Wilaya} key={i} data-idwilaya={IDWilaya}>
                      {IDWilaya}-{Wilaya}
                    </option>
                  </>
                )
              })}
          </select>
          <BiChevronDown
            className="absolute top-1/2  left-1 -translate-y-1/2"
            size={26}
          />
          <FaMapSigns className="absolute top-1/2  right-4 -translate-y-1/2 text-xl" />
        </div>
        {errors.state && (
          <span className="text-red-500 text-sm">{errors.state} </span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="city">البلدية :</label>
        <div className="relative w-full">
          <select
            name="city"
            value={form?.city}
            className="border border-gray-700 outline-0 pt-2 pb-2.5 pr-16 w-full appearance-none rounded"
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
          <BiChevronDown
            className="absolute top-1/2  left-1 -translate-y-1/2"
            size={26}
          />
          <BsFillSignpostFill className="absolute top-1/2  right-4 -translate-y-1/2 text-xl" />
        </div>
        {errors.city && (
          <span className="text-red-500 text-sm">{errors.city} </span>
        )}
      </div>

      <Offers form={form} setForm={setForm} />

      <QauntityComponent form={form} setForm={setForm} />

      <ShippingForm form={form} setForm={setForm} tarifs={tarifs} />
      {errors.shippingMethod && (
        <span className="text-red-500 text-sm">{errors.shippingMethod} </span>
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
