interface VariantsProps {
  form: any
  setForm: (form: any) => void
}

const Variants = ({ form, setForm }: VariantsProps) => {
  const selectedItem = form.selectedVariantItem

  return (
    <div className="w-full mt-4">
      {/* Loop through all variants */}
      {form.variants.map((variant: any) => (
        <div key={variant.name} className="flex flex-col mb-2">
          <label className="font-semibold text-sm mb-1">{variant.name}</label>
          <div className="flex gap-2 flex-wrap">
            {variant.variantItems?.map((item: any) => {
              const isSelected = selectedItem?.value === item.value

              return (
                <button
                type="button"
                  key={item.value}
                  className={`hover:cursor-pointer border rounded px-4 py-2 text-sm flex items-center justify-center gap-2 ${
                    isSelected
                      ? "border-green-500 bg-green-200"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    setForm((prev: any) => ({
                      ...prev,
                      selectedVariantItem: item,
                      price: item.price,
                      totalPrice:
                        item.price * prev.quantity + prev.shippingPrice
                    }))
                  }}
                >
                  {item.imageUrl !== "" && (
                    <img
                    src={item.imageUrl}
                    alt=""
                    className="w-10 h-10 rounded-full"
                    />
                  )}
                  <span className="font-semibold">{item.value}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Variants
