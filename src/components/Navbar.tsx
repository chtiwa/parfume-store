import { IoSearchOutline } from "react-icons/io5"
import { RiMenu2Fill, RiMenuFill } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"
import { setIsSearchModalOpen, setIsSidebarOpen } from "../features/modalsSlice"
import { useAppDispatch } from "../features/hooks"

const Navbar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const links = [
    { title: "Accueil", href: "/" },
    { title: "Homme", href: "/homme" },
    { title: "Femme", href: "/femme" }
    // { title: "Collection", href: "/homme" }
  ]

  return (
    <nav className="flex items-center px-4 sm:px-16 border-b border-gray-200 shadow-xs">
      <div
        className="hover:cursor-pointer flex flex-1/6 items-center justify-center sm:hidden group"
        onClick={() => dispatch(setIsSidebarOpen(true))}
      >
        <RiMenu2Fill size={24} className="flex group-hover:hidden" />
        <RiMenuFill size={24} className="hidden group-hover:flex" />
      </div>
      <div className="flex flex-4/6 sm:flex-1/6 items-center justify-center">
        <img
          src="/logo.png"
          alt="lk parfumo logo"
          className="h-22 w-22 object-cover hover:cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <ul className="hidden sm:flex items-center justify-center gap-2 flex-4/6">
        {links.map((link, i) => {
          const { title, href } = link
          return (
            <Link
              to={href}
              className="text-gray-800 hover:text-black text-sm hover:underline font-semibold"
              key={i}
            >
              {title}
            </Link>
          )
        })}
      </ul>
      <div
        className="flex items-center justify-center gap-2 flex-1/6 hover:cursor-pointer"
        onClick={() => dispatch(setIsSearchModalOpen(true))}
      >
        <IoSearchOutline size={26} />
        {/* <FaRegHeart /> */}
      </div>
    </nav>
  )
}

export default Navbar
