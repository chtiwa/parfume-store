import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import SuccessModal from "./SuccessModal"
import { useEffect } from "react"

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView")
    }
  }, [location])

  return (
    <>
      <SuccessModal />
      <Sidebar />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
