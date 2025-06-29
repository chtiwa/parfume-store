interface VariantsProps {
  form: any
  setForm: (form: any) => void
}

const Variants = ({ form, setForm }: VariantsProps) => {
  // const variants = [
  //   {
  //     id: "1",
  //     title: "Capacity",
  //     variantItems: [
  //       { id: "1", value: "100ml", quantity: 5 },
  //       { id: "1", value: "50ml", quantity: 5 },
  //       { id: "1", value: "30ml", quantity: 5 }
  //     ]
  //   }
  // ]

  console.log(form.variants)

  //  selec the variant item id
  return (
    <div className="w-full mt-4">
      {form.variants.map((variant: any) => {
        return (
          <ul className="w-full border-b-2 border-t-2 border-l border-r flex justify-evenly text-sm sm:text-base rounded ">
            {variant.variantItems.map((variantItem: any, i: any) => (
              <li
                className={`border-l border-r w-full flex items-center justify-center py-1.5  hover:cursor-pointer ${
                  variantItem.value === form.variant
                    ? "bg-black text-white border-black"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() =>
                  setForm((prev: any) => ({
                    ...prev,
                    selectedVariantItem: variantItem,
                    variant: variantItem.value
                  }))
                }
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
