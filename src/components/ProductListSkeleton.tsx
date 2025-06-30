import Skeleton from "./Skeleton"

const ProductListSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 py-4 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-start p-4 space-y-2"
        >
          <Skeleton className="w-full h-full rounded aspect-square " />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-2/4" />
          <Skeleton className="h-5 w-1/4" />
        </div>
      ))}
    </div>
  )
}

export default ProductListSkeleton
