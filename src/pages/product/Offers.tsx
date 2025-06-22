interface OffersProps {
  form: any
  setForm: (form: any) => void
}

const Offers = ({ form, setForm }: OffersProps) => {
  const variants = ["100ml", "50ml", "30ml"]
  return (
    <div className="w-full mt-4">
      <ul className="w-full border-b-2 border-t-2 border-l border-r flex justify-evenly text-sm sm:text-base ">
        {variants.map((variant, i) => (
          <li
            className={`border-l border-r w-full flex items-center justify-center py-1.5  hover:cursor-pointer ${
              variant === form.variant
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() =>
              setForm((prev: any) => ({ ...prev, variant: variant }))
            }
            key={i}
          >
            {variant}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Offers
