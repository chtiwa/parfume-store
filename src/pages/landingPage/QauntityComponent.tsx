import { FaCheck } from "react-icons/fa"

interface QauntityComponentI {
  form: any
  setForm: (form: any) => void
}

const QauntityComponent = ({ form, setForm }: QauntityComponentI) => {
  const basePrice = form.selectedVariantItem?.price || 0
  const originalShipping = form.shippingPrice

  const getUpsellPrice = (qty: number) => {
    const singlePerfumeDiscounted = basePrice * getDiscountMultiplier(qty)
    return singlePerfumeDiscounted * qty
  }

  const getDiscountMultiplier = (qty: number) => {
    switch (qty) {
      case 1:
        return 1.0 // Full price
      case 2:
        return 0.85 // 15% off
      case 3:
        return 0.7 // 30% off + free shipping
      default:
        return 1.0
    }
  }

  const getShippingForQty = (qty: number) => {
    return qty === 3 ? 0 : originalShipping
  }

  const handleSelectQuantity = (qty: number) => {
    setForm((prev: any) => ({
      ...prev,
      quantity: qty,
      shippingPrice: getShippingForQty(qty),
      totalPrice: getUpsellPrice(qty) + getShippingForQty(qty)
    }))
  }

  return (
    <div className="w-full flex flex-col gap-4 mt-4">
      {/* Upsell Pricing Tiers - Matches your original styling */}
      <ul className="flex flex-col gap-4">
        {/* Tier 1 */}
        <li
          className={`w-full flex items-center justify-between p-3 border-2 rounded transition-all cursor-pointer hover:scale-[1.02] ${
            form.quantity === 1
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => handleSelectQuantity(1)}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="relative flex items-center justify-end">
              <input
                type="radio"
                name="quantity"
                className="peer appearance-none border border-gray-500 checked:border-green-500 checked:border-2 w-5 h-5 rounded-md cursor-pointer"
                checked={form.quantity === 1}
                onChange={() => handleSelectQuantity(1)}
              />
              <FaCheck className="absolute text-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500 opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </div>
            <span className="font-semibold">واحد فقط</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-black">
              {basePrice.toLocaleString()} د.ج
            </div>
            <div className="text-sm text-gray-500">السعر الكامل</div>
          </div>
        </li>

        {/* Tier 2 */}
        <li
          className={`w-full flex items-center justify-between p-3 border-2 rounded transition-all cursor-pointer hover:scale-[1.02] ${
            form.quantity === 2
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => handleSelectQuantity(2)}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="relative flex items-center justify-end">
              <input
                type="radio"
                name="quantity"
                className="peer appearance-none border border-gray-500 checked:border-green-500 checked:border-2 w-5 h-5 rounded-md cursor-pointer"
                checked={form.quantity === 2}
                onChange={() => handleSelectQuantity(2)}
              />
              <FaCheck className="absolute text-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500 opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </div>
            <span className="font-semibold">عرض ×2</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">
              {(basePrice * 0.9 * 2).toLocaleString()} د.ج
            </div>
            <div className="text-sm font-semibold text-green-600">10%- خصم</div>
          </div>
        </li>

        {/* Tier 3 - Best Deal */}
        <li
          className={`w-full flex items-center justify-between p-3 border-2 rounded transition-all cursor-pointer hover:scale-[1.02] ${
            form.quantity === 3
              ? "border-green-500 bg-green-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => handleSelectQuantity(3)}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="relative flex items-center justify-end">
              <input
                type="radio"
                name="quantity"
                className="peer appearance-none border border-gray-500 checked:border-green-500 checked:border-2 w-5 h-5 rounded-md cursor-pointer"
                checked={form.quantity === 3}
                onChange={() => handleSelectQuantity(3)}
              />
              <FaCheck className="absolute text-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500 opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </div>
            <span className="font-bold text-green-700">أفضل عرض ×3</span>
          </div>
          <div className="text-right">
            <div className="flex justify-end text-xl font-bold text-green-700">
              {(basePrice * 0.8 * 3).toLocaleString()} د.ج
            </div>
            <div className="text-sm font-bold flex items-center gap-1">
              <span>20%- خصم</span>
              <span className="text-green-600">🚚 مع توصيل مجاني</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default QauntityComponent
