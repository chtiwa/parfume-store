import { FaMinus, FaPlus } from "react-icons/fa"

interface QauntityComponentI {
  form: any
  setForm: (form: any) => void
}

const QauntityComponent = ({ form, setForm }: QauntityComponentI) => {
  const handleQuantityChange = (type: string) => {
    if (type === "dec") {
      if (form.quantity > 1) {
        setForm((prev: any) => ({ ...prev, quantity: prev.quantity - 1 }))
      }
    } else {
      if (form.quantity < 5) {
        setForm((prev: any) => ({ ...prev, quantity: prev.quantity + 1 }))
      }
    }
  }
  return (
    <div className="w-full flex items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-4 border-2 p-2 rounded">
        <FaPlus
          className="hover:cursor-pointer"
          onClick={() => handleQuantityChange("inc")}
        />
        <span className="font-semibold">{form.quantity}</span>
        <FaMinus
          className="hover:cursor-pointer"
          onClick={() => handleQuantityChange("dec")}
        />
      </div>
    </div>
  )
}

export default QauntityComponent
