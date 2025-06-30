import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ProductsList from "../../components/ProductsList"

const Products = () => {
  const location = useLocation()
  const [tag, setTag] = useState("")

  useEffect(() => {
    if (location.pathname.slice(1) !== undefined) {
      setTag(location.pathname.slice(1))
    }
  }, [location])

  return (
    <div className="flex flex-col gap-4 pb-16">
      <div
        className="relative w-full h-[200px] bg-center bg-cover bg-no-repeat bg-gray-50 border-b border-gray-200"
        // style={{ backgroundImage: `url('white-bg.jpg')` }}
      >
        {/* <div className="absolute inset-0 bg-black/50 z-0" /> */}

        <h3 className="altfont absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 text-black z-10 font-semibold text-3xl sm:text-4xl underline">
          Nos Parfums :
        </h3>
      </div>
      <h3 className="pl-8 mt-8 altfont text-xl underline">Parfums {tag} :</h3>
      <ProductsList tag={tag} />
    </div>
  )
}

export default Products
