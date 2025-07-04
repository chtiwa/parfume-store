import { useState } from "react"

interface DropDownProps {
  title: string
  description: string
}

const DropDown = ({ title, description }: DropDownProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border rounded-lg overflow-hidden shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 hover:cursor-pointer text-left"
      >
        <span className="font-medium">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="px-4 py-3 text-gray-800 bg-white">{description}</div>
      )}
    </div>
  )
}

export default DropDown
