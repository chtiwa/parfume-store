import { useState } from "react"
import SearchInput from "./SearchInput"
import PackFormComponent from "./PackForm"
import { useGetPromoRemainingQuery } from "@/services/productsService"

export interface VariantItem {
  value: string
  price: number
}

export interface Variant {
  title: string
  variantItems: VariantItem[]
}

export interface Perfume {
  id: string
  title: string
  price: number
  images: { url: string }[]
  variants: Variant[]
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
  selectedPerfumes: (Perfume | null)[]
  capacities: string[]
  selectedCapacity: "30ml" | "50ml" | "100ml"
}

const Pack = () => {
  const { isLoading, data } = useGetPromoRemainingQuery({})
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
    capacities: ["30ml", "50ml", "100ml"],
    selectedPerfumes: [null, null, null],
    selectedCapacity: "30ml"
  })

  const handleSelectPerfume = (index: number, perfume: Perfume) => {
    const updated = [...form.selectedPerfumes]
    updated[index] = perfume
    setForm({ ...form, selectedPerfumes: updated })
  }

  const [perfumeSelectionError, setPerfumeSelectionError] = useState("")

  return (
    <div className="flex flex-col items-center gap-8 p-6 min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 text-center">
        <span
          className="hover:underline cursor-pointer"
          onClick={() => window.history.back()}
        >
          Nos parfums
        </span>
        <span className="px-1 text-gray-400">{">"}</span>
        <span className="font-medium">Pack de 3 Parfums</span>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Choisissez Votre Pack
      </h2>
      <p className="text-center text-gray-700 max-w-md">
        Sélectionnez 3 parfums que vous voulez et choisissez la capacité pour
        tous.
      </p>
      <p className="text-center text-gray-700 font-semibold max-w-md animate-bounce">
        Les commades restantes {isLoading ? "En attente..." : data?.remaining}.
      </p>

      {/* Perfume selectors */}
      <div className="w-full flex flex-col items-center gap-6 max-w-lg">
        {Array.from([0, 1, 2]).map((index: number) => (
          <div className="flex flex-col gap-2 w-full" key={index}>
            <span className="font-semibold text-gray-700">
              Parfum {index + 1}:
            </span>
            <SearchInput
              form={form}
              // @ts-ignore
              selected={form.selectedPerfumes[index]}
              // @ts-ignore
              onSelect={(perfume) => handleSelectPerfume(index, perfume)}
            />
          </div>
        ))}

        {perfumeSelectionError !== "" && (
          <span className="text-red-500">{perfumeSelectionError}</span>
        )}
      </div>

      <div className="w-full flex flex-col gap-2 items-center justify-center">
        <span className="font-semibold">Capacity :</span>
        <ul className="w-full max-w-lg border-b-2 border-t-2 border-black border-l border-r flex justify-evenly text-sm sm:text-base rounded">
          {form.capacities.map((capacity: any, i: any) => {
            return (
              <li
                className={`border-l border-r border-black w-full flex items-center justify-center py-1.5  hover:cursor-pointer ${
                  capacity === form.selectedCapacity
                    ? "bg-black text-white border-black"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => {
                  setForm((prev: any) => ({
                    ...prev,
                    selectedCapacity: capacity
                  }))
                }}
                key={i}
              >
                {capacity}
              </li>
            )
          })}
        </ul>
      </div>

      <PackFormComponent
        // @ts-ignore
        form={form}
        // @ts-ignore
        setForm={setForm}
        setPerfumeSelectionError={setPerfumeSelectionError}
      />
    </div>
  )
}

export default Pack
