import Skeleton from "../../components/Skeleton"

const ProductSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2 pt-8 pb-8 md:px-18">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center justify-center w-full text-gray-700 text-sm gap-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Main content skeleton */}
      <div className="flex flex-col gap-4 lg:flex-row items-center lg:items-start justify-center">
        {/* Image skeleton */}
        <div className="w-full max-w-sm flex flex-col gap-2 justify-center ">
          <div className="flex items-center justify-center">
            <Skeleton className="w-full aspect-square rounded" />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <Skeleton className="w-26 h-26 aspect-square rounded" />
            <Skeleton className="w-26 h-26 aspect-square rounded" />
            <Skeleton className="w-26 h-26 aspect-square rounded" />
          </div>
        </div>

        {/* Details skeleton */}
        <div className="w-full flex flex-col gap-2 max-w-lg px-4 sm:px-1">
          <Skeleton className="h-8 w-2/3" /> {/* Title */}
          <div className="flex items-center gap-1">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <Skeleton className="h-5 w-40" /> {/* Tags */}
          <Skeleton className="h-6 w-32" /> {/* Price */}
          <Skeleton className="h-24 w-full" /> {/* Description */}
          {/* Form skeleton */}
          <div className="flex flex-col gap-4 w-full mt-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
            <Skeleton className="h-12 w-1/2 self-center" />{" "}
            {/* Submit button */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton
