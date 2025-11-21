import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import SuccessModal from "./SuccessModal"
import { useEffect } from "react"
import MetaPixel from "./MetaPixel"
import SearchModal from "./SearchModal"
import { Toaster } from "@/components/ui/sonner"

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView")
    }
    if (window.ttq) {
      // @ts-ignore
      window.ttq.track("ViewContent")
    }
  }, [location])

  return (
    <>
      <MetaPixel />
      <SuccessModal />
      <SearchModal />
      <Sidebar />
      <Navbar />
      <Outlet />
      <Toaster />
      <Footer />
    </>
  )
}

export default Layout
