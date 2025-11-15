const PerfumeLoadingSkeleton = () => {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
        <div className="w-1/3 h-3 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export default PerfumeLoadingSkeleton
