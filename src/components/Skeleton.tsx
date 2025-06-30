// components/Skeleton.tsx
import React from "react"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200/50 ${className}`}
      {...props}
    />
  )
}

export default Skeleton
