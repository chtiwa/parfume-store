import { useEffect, useMemo, useState } from "react"
import { IoMdStar } from "react-icons/io"
import {
  useLazyGetProductsQuery
} from "../../services/productsService"
import ProductSkeleton from "../product/ProductSkeleton"
import FormComponent from "../product/FormComponent"

interface Perfume {
  id: string
  title: string
  price: number
  image: string
}

interface PackFormState {
  shopName: string
  fullName: string
  phoneNumber: string
  state: string
  stateNumber: number
  city: string
  shippingMethod: "Domicile" | "Stopdesk"
  shippingPrice: number
  quantity: number
  selectedPerfumes: Perfume[]
}

const Pack = () => {
  const [getProducts, { data, isLoading, error }] = useLazyGetProductsQuery()
  const [form, setForm] = useState<PackFormState>({
    shopName: "lk-parfumo",
    fullName: "",
    phoneNumber: "",
    state: "Alger",
    stateNumber: 16,
    city: "",
    shippingMethod: "Domicile",
    shippingPrice: 500,
    quantity: 1,
    selectedPerfumes: []
  })

  useEffect(() => {
    getProducts({}).then((data) => console.log(data))
  }, [])

  const availablePerfumes = useMemo(() => {
    if (!data?.data) return []

    return data.data
      .map((product: any) => {
        const variant = product.variants?.find((v: any) =>
          v.variantItems?.some((item: any) => item.value === "30ml")
        )
        const item = variant?.variantItems?.find((i: any) => i.value === "30ml")
        if (!item) return null

        return {
          id: product.id,
          title: product.title,
          price: item.price,
          image: product.images?.[0]?.url || ""
        }
      })
      .filter(Boolean)
  }, [data])

  const totalPerfumePrice = useMemo(
    () => form.selectedPerfumes.reduce((sum, p) => sum + p.price, 0),
    [form.selectedPerfumes]
  )

  const totalPrice = totalPerfumePrice + form.shippingPrice

  const handlePerfumeSelect = (perfume: Perfume) => {
    setForm((prev) => {
      const alreadySelected = prev.selectedPerfumes.some(
        (p) => p.id === perfume.id
      )
      let updated = [...prev.selectedPerfumes]

      if (alreadySelected) {
        updated = updated.filter((p) => p.id !== perfume.id)
      } else if (updated.length < 3) {
        updated.push(perfume)
      }

      return { ...prev, selectedPerfumes: updated }
    })
  }

  useEffect(() => {
    if (form.selectedPerfumes.length > 0 && window.ttq) {
      // @ts-ignore
      window.ttq.track("ViewContent", {
        contents: form.selectedPerfumes.map((p) => ({
          content_id: p.id,
          content_type: "product",
          content_name: p.title
        })),
        value: totalPrice,
        currency: "DZA"
      })
    }
  }, [form.selectedPerfumes, totalPrice])

  if (isLoading) return <ProductSkeleton />

  if (error || !data?.data) {
    return (
      <div className="text-red-500 text-center">
        Erreur de chargement des parfums.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="text-sm text-gray-700 text-center">
        <span
          className="hover:underline cursor-pointer"
          onClick={() => window.history.back()}
        >
          Nos parfums
        </span>
        <span className="px-1">{">"}</span>
        <span>Pack de 3 Parfums (30ml)</span>
      </div>

      <h2 className="text-3xl font-bold text-center">Choisissez Votre Pack</h2>
      <p className="text-center text-gray-600">
        Sélectionnez 3 parfums de 30ml
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {availablePerfumes.map((perfume: any) => {
          const selected = form.selectedPerfumes.some(
            (p) => p.id === perfume.id
          )
          return (
            <div
              key={perfume.id}
              className={`border p-4 rounded cursor-pointer transition ${
                selected ? "border-black bg-gray-100" : "border-gray-300"
              }`}
              onClick={() => handlePerfumeSelect(perfume)}
            >
              <img
                src={perfume.image}
                alt={perfume.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-semibold">{perfume.title}</h3>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <IoMdStar key={i} />
                ))}
              </div>
              <div className="text-red-700 font-bold">{perfume.price} DA</div>
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold">Votre sélection :</h3>
        {form.selectedPerfumes.length === 0 ? (
          <p className="text-gray-500">Aucun parfum sélectionné.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {form.selectedPerfumes.map((p) => (
              <li key={p.id} className="flex items-center gap-2">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <span>
                  {p.title} - {p.price} DA
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {form.selectedPerfumes.length === 3 && (
        <div className="mt-8 max-w-lg mx-auto">
          <FormComponent
            product={{
              title: `Pack: ${form.selectedPerfumes
                .map((p) => p.title)
                .join(" | ")}`,
              images: [],
              price: totalPerfumePrice
            }}
            form={{ ...form, price: totalPerfumePrice, totalPrice }}
            setForm={setForm}
          />
        </div>
      )}
    </div>
  )
}

export default Pack
