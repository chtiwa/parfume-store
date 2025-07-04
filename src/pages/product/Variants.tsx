interface VariantsProps {
  form: any
  setForm: (form: any) => void
}

const Variants = ({ form, setForm }: VariantsProps) => {
  return (
    <div className="w-full mt-4">
      {form.variants.map((variant: any, i: any) => {
        return (
          <ul
            className="w-full border-b-2 border-t-2 border-l border-r flex justify-evenly text-sm sm:text-base rounded"
            key={i}
          >
            {variant.variantItems.map((variantItem: any, i: any) => (
              <li
                className={`border-l border-r w-full flex items-center justify-center py-1.5  hover:cursor-pointer ${
                  variantItem.value === form.selectedVariantItem.value
                    ? "bg-black text-white border-black"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => {
                  setForm((prev: any) => ({
                    ...prev,
                    selectedVariantItem: variantItem,
                    price: variantItem.price
                  }))
                }}
                key={i}
              >
                {variantItem.value}
              </li>
            ))}
          </ul>
        )
      })}
    </div>
  )
}

export default Variants
