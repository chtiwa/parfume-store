import { FaCheck } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../features/hooks"
import { setIsSuccessModalOpen } from "../features/modalsSlice"

const SuccessModal = () => {
  const dispatch = useAppDispatch()
  const { isSuccessModalOpen, orderedProductTitle } = useAppSelector(
    (state) => state.modals
  )

  return (
    <div
      className={`${
        isSuccessModalOpen
          ? "w-full h-screen fixed inset-0 backdrop-blur-3xl z-30 flex items-center justify-center opacity-100 p-4"
          : "opacity-0 z-0 hidden"
      } transition-opacity duration-300`}
    >
      <div className="w-full max-w-lg flex gap-4 flex-col px-6 py-4 rounded border border-gray-300 shadow bg-white">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <FaCheck className="text-green-500" />
          <h3 className="font-semibold text-center">
            Merci pour votre commande chez LK Parfumo !
          </h3>
        </div>

        <p className="text-base text-center">
          Nous avons bien reçu votre demande pour {orderedProductTitle}. Nous
          vous contacterons bientôt pour confirmer votre commande.
        </p>
        <Link
          className="hover:cursor-pointer"
          to={"/"}
          onClick={() => {
            window.scrollTo({ top: 0 })
            dispatch(
              setIsSuccessModalOpen({
                isSuccessModalOpen: false,
                orderedProductTitle: ""
              })
            )
          }}
        >
          <button className="w-full bg-black px-4 py-1.5 text-sm text-white rounded hover:cursor-pointer">
            Retour
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SuccessModal
