import React, { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { Link } from "react-router-dom"

const SuccessModal = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(true)
  return (
    <div
      className={`${
        isSuccessModalOpen
          ? "w-full h-screen fixed inset-0 backdrop-blur-2xl z-20 flex items-center justify-center opacity-100 p-4"
          : "opacity-0 z-0 hidden"
      } transition-opacity duration-300`}
    >
      <div className="w-full max-w-lg flex gap-4 flex-col px-6 py-4 rounded border border-gray-300 shadow bg-white">
        <div className="flex justify-center items-center gap-2">
          <FaCheck className="text-green-500" />
          <h3 className="font-semibold text-center">
            Merci pour votre commande!
          </h3>
        </div>

        <p className="text-sm text-center">
          Nous allons vous contacter pour confirmer la commande.
        </p>
        <Link to={"/"} onClick={() => setIsSuccessModalOpen(false)}>
          <button className="w-full bg-black px-4 py-1.5 text-sm text-white rounded">
            Retour
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SuccessModal
