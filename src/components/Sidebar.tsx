import { IoClose } from "react-icons/io5"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../features/hooks"
import { setIsSidebarOpen } from "../features/modalsSlice"

const Sidebar = () => {
  const { isSidebarOpen } = useAppSelector((state) => state.modals)
  const dispatch = useAppDispatch()
  const links = [
    { title: "Accueil", href: "/" },
    { title: "Homme", href: "/homme" },
    { title: "Femme", href: "/femme" }
    // { title: "Collection", href: "/homme" }
  ]

  return (
    <div
      className={`${
        !isSidebarOpen
          ? "hidden w-0"
          : "fixed inset-0 w-full max-w-sm h-screen backdrop-blur-2xl bg-white shadow-xl p-4 z-20"
      }`}
    >
      <div className="w-full">
        <IoClose
          className="text-red-500 cursor-pointer mt-3.5 ml-7.5"
          size={30}
          onClick={() => dispatch(setIsSidebarOpen(false))}
        />
      </div>
      <ul className="w-full flex flex-col items-center justify-center mt-8">
        {links.map((link, i) => {
          const { title, href } = link
          return (
            <Link
              onClick={() => dispatch(setIsSidebarOpen(false))}
              to={href}
              className="w-full hover:bg-gray-50 transition duration-200 py-2 text-center"
              key={i}
            >
              {title}
            </Link>
          )
        })}
      </ul>
      <div className="flex justify-center items-end h-full">Balls</div>
    </div>
  )
}

export default Sidebar
