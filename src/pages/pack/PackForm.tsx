import { useEffect, useState } from "react"
import { FaMapSigns, FaPhoneAlt } from "react-icons/fa"
import { IoPerson } from "react-icons/io5"
import ShippingForm from "../product/ShippingForm.tsx"
import { BsFillSignpostFill } from "react-icons/bs"
import { BiChevronDown } from "react-icons/bi"
import { tarifs, cities, bureaux } from "../../data.ts"
import { useAppDispatch } from "../../features/hooks.ts"
import { useCreateOrderMutation } from "../../services/ordersService.ts"
import { setIsSuccessModalOpen } from "../../features/modalsSlice.ts"
import { getFacebookParams, getTikTokParams } from "../../utils/tracking.ts"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { toast } from "sonner"

interface FormErrors {
  fullName?: string
  phoneNumber?: string
  state?: string
  city?: string
  shippingMethod?: string
  selectedPerfumes?: string
}

interface Product {
  title: string
  images: string[]
  price: number
}

interface FormState {
  fullName: string
  phoneNumber: string
  productId: string
  productName: string
  state: string
  stateNumber: string | ""
  city: string
  shippingMethod: string
  shippingPrice: number
  totalPrice: number
  quantity: number
  selectedVariantItem: { price: number; value: string }
  selectedPerfumes: any
  selectedCapacity: any
}

interface PackFormComponentProps {
  product: Product
  form: FormState
  setForm: (form: FormState) => void
  setPerfumeSelectionError: (error: string) => void
}

const PackFormComponent = ({
  form,
  setForm,
  setPerfumeSelectionError
}: PackFormComponentProps) => {
  // const { id } = useParams()
  const dispatch = useAppDispatch()
  const [createOrder, { error, isLoading }] = useCreateOrderMutation()

  const [errors, setErrors] = useState<FormErrors>({})
  const [discountPrice, setDiscountPrice] = useState(0)

  useEffect(() => {
    if (form.stateNumber && form.shippingMethod && form.selectedCapacity) {
      // @ts-ignore
      setForm((prev: FormState) => ({
        ...prev,
        // @ts-ignore
        shippingPrice: Number(
          // @ts-ignore
          tarifs[Number(form.stateNumber) - 1][form.shippingMethod]
        ),
        totalPrice:
          calculateTotalPrice() +
          // @ts-ignore
          Number(tarifs[form.stateNumber - 1][form.shippingMethod])
      }))
    }
  }, [
    form.stateNumber,
    form.shippingMethod,
    form.selectedCapacity,
    form.selectedPerfumes,
    form.quantity
  ])

  useEffect(() => {
    setErrors({}) // Clear errors when variant changes
  }, [form.selectedVariantItem])

  const generateProductName = () => {
    const names = form.selectedPerfumes
      .filter((p: any) => p !== null)
      .map((p: any) => p.title)

    if (names.length === 0) return ""

    return `${names.join(" x ")} (${form.selectedCapacity})`
  }

  const reductions = {
    "30ml": [0, 200, 400],
    "50ml": [0, 300, 600],
    "100ml": [0, 800, 1500]
  }

  const calculateTotalPrice = () => {
    let total = 0
    let index = 0
    form.selectedPerfumes.forEach((perfume: any) => {
      if (!perfume) return

      // find the 'capacity' variant
      const capacityVariant = perfume.variants?.find(
        (v: any) => v.title.toLowerCase() === "capacity"
      )
      if (!capacityVariant) return

      // find the correct variant item (100ml, 50ml, 30ml...)
      const variantItem = capacityVariant.variantItems?.find(
        (item: any) => item.value === form.selectedCapacity
      )
      if (!variantItem) return

      index++

      total += variantItem.price
    })

    const reductionPrice =
      // @ts-ignore
      reductions[`${form.selectedCapacity}`][index - 1 > 0 ? index - 1 : 0]
    setDiscountPrice(reductionPrice)

    return total - reductionPrice
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === "state") {
      //  @ts-ignore
      const selectedOptions = e.target.selectedOptions[0]
      const stateNumber = selectedOptions.getAttribute("data-idwilaya")

      //  @ts-ignore
      setForm((prev: FormState) => ({
        ...prev,
        state: value,
        stateNumber: stateNumber || ""
      }))
    } else {
      //  @ts-ignore
      setForm((prev: FormState) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Check last order timestamp in localStorage
    const lastOrderTime = localStorage.getItem("lastOrderTime")
    const now = Date.now()
    const oneDayInMs = 6 * 60 * 60 * 1000 // 6 hours in milliseconds

    if (lastOrderTime && now - parseInt(lastOrderTime) < oneDayInMs) {
      const timeLeft = Math.ceil(
        (oneDayInMs - (now - parseInt(lastOrderTime))) / (60 * 60 * 1000)
      )
      setErrors((prev) => ({
        ...prev,
        orderLimit: `يرجى الانتظار ${timeLeft} ساعة قبل تقديم طلب آخر`
      }))
      toast(`يرجى الانتظار ${timeLeft} ساعة قبل تقديم طلب آخر`)
      return
    }

    if (validateForm()) {
      handleCreateOrder()
    }
  }

  const handleCreateOrder = async () => {
    // get the facebook params
    const { fbclid, fbp, fbc } = getFacebookParams()
    const { ttclid } = getTikTokParams()
    let source = "organic"
    if (fbclid) source = "facebook"
    if (ttclid) source = "tiktok"

    console.log(form)

    const res = await createOrder({
      ...form,
      // @ts-ignore
      productId: form.selectedPerfumes[0].id,
      variant: form.selectedCapacity,
      productName: generateProductName(),
      price: form.selectedPerfumes[0].price,
      FBclid: fbclid,
      FBp: fbp,
      FBc: fbc,
      Ttclid: ttclid,
      conversionSource: source
    }).unwrap()
    if (res.success) {
      // Store current timestamp in localStorage
      const now = Date.now()
      localStorage.setItem("lastOrderTime", now.toString())
      dispatch(
        setIsSuccessModalOpen({
          isSuccessModalOpen: true,
          orderedProductTitle: generateProductName()
        })
      )
    }
  }

  const isValidPhoneNumber = (phone: string) => {
    const regex = /^(05|06|07)\d{8}$/
    return regex.test(phone)
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    // Check selected perfumes
    if (form.selectedPerfumes[0] === null) {
      setPerfumeSelectionError("يجب عليك اختيار عطر واحد على الأقل")
      newErrors.selectedPerfumes = "يجب عليك اختيار عطر واحد على الأقل"
    } else {
      setPerfumeSelectionError("")
    }

    // Check for fullName
    if (!form.fullName || !form.fullName.trim()) {
      newErrors.fullName = "يجب عليك كتابة اسمك"
    }

    // Check for phoneNumber
    if (!form.phoneNumber || !form.phoneNumber.trim()) {
      newErrors.phoneNumber = "يجب عليك كتابة رقمك"
    } else if (!isValidPhoneNumber(form.phoneNumber)) {
      newErrors.phoneNumber = "يجب عليك كتابة رقم صحيح"
    }

    // Check for state
    if (!form.state || !form.state.trim()) {
      newErrors.state = "يجب عليك كتابة ولايتك"
    }

    // Check for city
    if (!form.city || !form.city.trim()) {
      newErrors.city = "يجب عليك كتابة مدينتك"
    }

    // Check for shippingMethod
    if (!form.shippingMethod || !form.shippingMethod.trim()) {
      newErrors.shippingMethod = "يجب عليك اختيار طريقة شحن"
    } else if (
      form.stateNumber &&
      form.shippingMethod === "Stopdesk" &&
      tarifs[Number(form.stateNumber) - 1]["Stopdesk"] === "0"
    ) {
      newErrors.shippingMethod = "يجب عليك اختيار طريقة شحن صالحة"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-2 rtl max-w-lg"
    >
      {/* <Variants form={form} setForm={setForm} /> */}
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
          <IoPerson className="absolute top-1/2 right-4 -translate-y-1/2 text-xl" />
        </div>
        {errors.fullName && (
          <span className="text-red-500 text-base">{errors.fullName}</span>
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
          <FaPhoneAlt className="absolute top-1/2 right-4 -translate-y-1/2 text-xl" />
        </div>
        {errors.phoneNumber && (
          <span className="text-red-500 text-base">{errors.phoneNumber}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="state">الولاية :</label>
        <div className="relative w-full">
          <select
            name="state"
            value={form.state}
            className="border-2 border-gray-700 outline-0 pt-2 pb-2.5 pr-16 w-full appearance-none rounded"
            onChange={handleChange}
          >
            {tarifs?.map((tarif, i) => {
              const { IDWilaya, Wilaya, Domicile } = tarif
              if (Domicile !== "0") {
                return (
                  <option value={Wilaya} key={i} data-idwilaya={IDWilaya}>
                    {IDWilaya}-{Wilaya}
                  </option>
                )
              }
              return null
            })}
          </select>
          <BiChevronDown
            className="absolute top-1/2 left-1 -translate-y-1/2"
            size={26}
          />
          <FaMapSigns className="absolute top-1/2 right-4 -translate-y-1/2 text-xl" />
        </div>
        {errors.state && (
          <span className="text-red-500 text-base">{errors.state}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="city">البلدية :</label>
        <div className="relative w-full">
          {form.shippingMethod === "Domicile" ? (
            <select
              name="city"
              value={form.city}
              className="border-2 border-gray-700 outline-0 pt-2 pb-2.5 pr-16 w-full appearance-none rounded"
              onChange={handleChange}
            >
              {form.state !== "" &&
                cities
                  ?.filter(
                    (c) => Number(c.wilaya_code) === Number(form.stateNumber)
                  )
                  ?.map((c, i) => (
                    <option value={c.commune_name_ascii} key={i}>
                      {c.commune_name_ascii}
                    </option>
                  ))}
            </select>
          ) : (
            <select
              name="city"
              value={form.city}
              className="border-2 border-gray-700 outline-0 pt-2 pb-2.5 pr-16 w-full appearance-none rounded"
              onChange={handleChange}
            >
              {form.state !== "" &&
                bureaux
                  ?.filter(
                    // @ts-ignore
                    (b) => Number(b.stateNumber) === Number(form.stateNumber)
                  )
                  ?.map((b) =>
                    // @ts-ignore
                    b.headquarters.map((h: string, i: number) => (
                      <option value={h} key={i}>
                        {h}
                      </option>
                    ))
                  )}
            </select>
          )}
          <BiChevronDown
            className="absolute top-1/2 left-1 -translate-y-1/2"
            size={26}
          />
          <BsFillSignpostFill className="absolute top-1/2 right-4 -translate-y-1/2 text-xl" />
        </div>
        {errors.city && (
          <span className="text-red-500 text-base">{errors.city}</span>
        )}
      </div>

      <ShippingForm form={form} setForm={setForm} tarifs={tarifs} />
      {errors.shippingMethod && (
        <span className="text-red-500 text-base">{errors.shippingMethod}</span>
      )}

      <div className="flex flex-col gap-2 w-full pt-4 text-lg">
        <div className="flex items-center justify-between">
          <span>السعر قبل التخفيض :</span>
          <span className="line-through text-red-500">
            {form.totalPrice + discountPrice} د.ج
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>التخفيض :</span>
          <span>{discountPrice} د.ج</span>
        </div>

        <div className="flex items-center justify-between font-semibold pt-2">
          <span>المجموع :</span>
          {/* the total price is the price with the discount */}
          <span>{form.totalPrice} د.ج</span>
        </div>
      </div>

      {error && <span className="text-red-500">Internal Server Error</span>}

      <button
        className="flex items-center justify-center px-8 pt-2 pb-2.5 border border-gray-500 font-bold text-xl text-white bg-black hover:scale-105 hover:border-green-500 animate-bounce transition duration-300 cursor-pointer mt-8 rounded"
        type="submit"
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          "احصل عليه الآن"
        )}
      </button>
    </form>
  )
}

export default PackFormComponent
