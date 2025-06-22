import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useState } from "react"
import SuccessModal from "./SuccessModal"

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <>
      <SuccessModal />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
