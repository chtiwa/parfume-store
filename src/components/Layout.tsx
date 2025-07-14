import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import SuccessModal from "./SuccessModal"
import { useEffect } from "react"
import MetaPixel from "./MetaPixel"
import SearchModal from "./SearchModal"
import { loadTikTokPixel } from "../utils/loadTiktokPixel"

const PIXEL_ID = "D1LU4QRC77U9OS2TN080"

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView")
    }

    loadTikTokPixel(PIXEL_ID)
      .then(() => {
        console.log("TikTok Pixel ready")
      })
      .catch(console.error)
    if (typeof window.ttq === "function") {
      window?.ttq("track", "PageView")
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
      <Footer />
    </>
  )
}

export default Layout
