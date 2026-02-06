import PaginationComponent from "../../components/Pagination"
import ProductsList from "../../components/ProductsList"

const BestSeller = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-8 mb-8">
      <h3 className="uppercase underline font-medium altfont sm:text-xl">
        Les meilleurs parfums
      </h3>
      <p className="text-gray-700 mt-1 sm:text-xl">Best Sellers !</p>
      {/* products list */}
      <ProductsList />
      <PaginationComponent />
    </div>
  )
}

export default BestSeller
