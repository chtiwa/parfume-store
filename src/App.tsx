import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/home/Home"
import Products from "./pages/products/Products"
import Product from "./pages/product/Product"
import TermsOfService from "./pages/termsOfService/TermsOfService"
import ShippingPolicy from "./pages/termsOfService/ShippingPolicy"
import ReturnRefund from "./pages/termsOfService/ReturnRefund"
import PrivacyPolicy from "./pages/termsOfService/PrivacyPolicy"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/homme" element={<Products />} />
      <Route path="/femme" element={<Products />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/shipping-policy" element={<ShippingPolicy />} />
      <Route path="/refund-return" element={<ReturnRefund />} />
      <Route path="*" element={<Home />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
