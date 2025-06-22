import { IoClose } from "react-icons/io5"
import { Link } from "react-router-dom"

interface SidebarI {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isSidebarOpen: boolean) => void
}

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarI) => {
  const links = [
    { title: "Home", href: "/" },
    { title: "Men", href: "/men" },
    { title: "Women", href: "/women" },
    { title: "Sale", href: "/sale" }
  ]
  return (
    <div
      className={`${
        !isSidebarOpen
          ? "hidden w-0"
          : "fixed inset-0 w-full max-w-sm h-screen backdrop-blur-2xl bg-white shadow-xl p-4"
      }`}
    >
      <div className="w-full">
        <IoClose
          className="text-red-500 cursor-pointer mt-3.5 ml-7.5"
          size={30}
          onClick={() => setIsSidebarOpen(false)}
        />
      </div>
      <ul className="w-full flex flex-col items-center justify-center mt-8">
        {links.map((link, i) => {
          const { title, href } = link
          return (
            <Link
              onClick={() => setIsSidebarOpen(false)}
              to={href}
              className="w-full hover:bg-gray-50 transition duration-200 py-2 text-center"
              key={i}
            >
              {title}
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar
