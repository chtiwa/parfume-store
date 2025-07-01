import { BiCopyright } from "react-icons/bi"
import { BsInstagram } from "react-icons/bs"
import { FaFacebook, FaTiktok } from "react-icons/fa"

const Footer = () => {
  const socials = [
    { link: "https://facebook.com/lk_parfumo", icon: <FaFacebook /> },
    { link: "https://www.instagram.com/lk_parfumo", icon: <BsInstagram /> },
    { link: "https://www.tiktok.com/@lk.parfumo", icon: <FaTiktok /> }
  ]
  return (
    <footer className="w-full px-8 py-4 border-t border-gray-300">
      <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
        <img
          src="/logo.png"
          alt="lk parfumo"
          className="w-22 h-22 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0 })}
        />
        <ul className="flex items-center justify-center gap-4">
          {socials.map((social, i) => {
            const { link, icon } = social
            return (
              <a
                href={link}
                target="_blank"
                className="text-xl hover:scale-120 transition duration-200"
                key={i}
              >
                {icon}
              </a>
            )
          })}
        </ul>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 sm:mt-0">
        <BiCopyright />
        <span className="text-xs">Copryright 2025, LK Parfumo.</span>
      </div>
    </footer>
  )
}

export default Footer
