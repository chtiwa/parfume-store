import { BiCopyright } from "react-icons/bi"
import { BsInstagram } from "react-icons/bs"
import { CiMail } from "react-icons/ci"
import { FaFacebook, FaInfoCircle, FaTiktok } from "react-icons/fa"
import { MdAlternateEmail, MdEmail, MdPrivacyTip } from "react-icons/md"
import { RiRefund2Fill } from "react-icons/ri"
import { TbTruckDelivery } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

const Footer = () => {
  const navigate = useNavigate()
  const socials = [
    { link: "https://facebook.com/lk_parfumo", icon: <FaFacebook /> },
    { link: "https://www.instagram.com/lk_parfumo", icon: <BsInstagram /> },
    { link: "https://www.tiktok.com/@lk.parfumo", icon: <FaTiktok /> }
  ]

  const links = [
    {
      title: "Conditions Générales d’Utilisation ",
      link: "/terms-of-service",
      icon: <FaInfoCircle />
    },
    {
      title: " Politique de Confidentialité ",
      link: "/privacy-policy",
      icon: <MdPrivacyTip />
    },
    {
      title: "Retour et Remboursement",
      link: "/refund-return",
      icon: <RiRefund2Fill />
    },
    {
      title: "Politique de Livraison",
      link: "/shipping-policy",
      icon: <TbTruckDelivery />
    }
  ]

  return (
    <footer className="w-full px-8 py-4 border-t border-gray-300">
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center sm:justify-between">
        <div className="flex flex-col gap-2 items-center justify-center">
          <img
            src="/logo.png"
            alt="lk parfumo"
            className="w-30 h-30 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0 })}
          />
          <ul className="flex items-center justify-center gap-4">
            {socials.map((social, i) => {
              const { link, icon } = social
              return (
                <a
                  href={link}
                  target="_blank"
                  className="text-2xl hover:scale-120 transition duration-200"
                  key={i}
                >
                  {icon}
                </a>
              )
            })}
          </ul>
          <div className="flex items-center-safe justify-center gap-1 mt-2">
            <CiMail size={22} />
            <span className="text-sm">lakhalzineddine12@gmail.com</span>
          </div>
        </div>
        <ul className="flex flex-col gap-2 my-4">
          {links.map((link, i) => {
            const { link: l, title, icon } = link
            return (
              <li
                key={i}
                className="flex gap-2 items-center justify-start text-gray-800 hover:cursor-pointer"
                onClick={() => navigate(l)}
              >
                <span className="text-xl">{icon}</span>
                <span>{title}</span>
              </li>
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
