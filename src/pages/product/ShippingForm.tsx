import { FaCheck } from "react-icons/fa"

interface ShippingFormInterface {
  form: any
  setForm: (form: any) => void
  tarifs: any
}

const ShippingForm = ({ form, setForm, tarifs }: ShippingFormInterface) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg sm:text-xl font-bold mt-2">طريقة الشحن :</h3>
      <ul className="flex flex-col gap-4 mt-4">
        <li className="w-full flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <div className="relative flex items-center justify-end">
              <input
                type="radio"
                name="shippingMethod"
                className="peer appearance-none border border-gray-500 checked:border-black checked:border-2 w-5 h-5 rounded-md cursor-pointer"
                checked={form?.shippingMethod === "Stopdesk"}
                onChange={() => {
                  setForm((form: any) => ({
                    ...form,
                    shippingMethod: "Stopdesk"
                    // shippingPrice: Number(
                    //   tarifs[Number(form?.stateNumber) - 1]["Stopdesk"]
                    // )
                  }))
                }}
              />
              <FaCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </div>
            <span className="mb-1">{"إلى المكتب"}</span>
          </div>
          <span>
            {form.stateNumber &&
              tarifs[Number(form?.stateNumber) - 1]["Stopdesk"]}{" "}
            د.ج
          </span>
        </li>
        <li className="w-full flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <div className="relative flex items-center justify-end">
              <input
                type="radio"
                name="shippingMethod"
                className="peer appearance-none border border-gray-500 checked:border-black checked:border-2 w-5 h-5 rounded-md cursor-pointer"
                checked={form?.shippingMethod === "Domicile"}
                onChange={() =>
                  setForm((form: any) => ({
                    ...form,
                    shippingMethod: "Domicile"
                    // shippingPrice: Number(
                    //   tarifs[Number(form?.stateNumber) - 1]["Domicile"]
                    // )
                  }))
                }
              />
              <FaCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </div>
            <span className="mb-1">{"إلى المنزل"}</span>
          </div>
          <span>
            {form.stateNumber &&
              tarifs[Number(form?.stateNumber) - 1]["Domicile"]}{" "}
            د.ج
          </span>
        </li>
      </ul>
    </div>
  )
}

export default ShippingForm
