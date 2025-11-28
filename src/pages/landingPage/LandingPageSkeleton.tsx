const LandingPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 animate-pulse">
      {/* Images Skeleton */}
      <section className="w-full max-w-6xl mb-12 grid grid-cols-1 gap-6">
        <div className="flex flex-col gap-2">
          <div className="w-full aspect-[9/16] bg-gray-200 rounded-2xl" />
          <div className="w-full aspect-[9/16] bg-gray-200 rounded-2xl" />
          <div className="w-full aspect-[9/16] bg-gray-200 rounded-2xl" />
          <div className="w-full aspect-[9/16] bg-gray-200 rounded-2xl" />
        </div>

        {/* Text Skeleton */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      </section>

      {/* Form Skeleton */}
      <section className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-6 mx-auto" />
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </section>
    </div>
  )
}
export default LandingPageSkeleton
