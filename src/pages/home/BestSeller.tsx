import ProductsList from "../../components/ProductsList"

const BestSeller = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mt-8">
      <h3 className="uppercase underline font-medium altfont">
        Les meilleurs parfums
      </h3>
      <p className="text-gray-700 mt-2">Best Seller Pour Cette Semaine!</p>
      {/* products list */}
      <ProductsList />
    </div>
  )
}

export default BestSeller
