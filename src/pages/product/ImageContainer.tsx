import { useEffect, useRef, useState } from "react"

interface ImageContainerI {
  images: string[]
}

const ImageContainer = ({ images }: ImageContainerI) => {
  const [active, setActive] = useState(0)
  const [transformOrigin, setTransformOrigin] = useState("center center")
  const [lockedUntil, setLockedUntil] = useState(0) // NEW
  const imgRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now()

      // if locked, do nothing
      if (now < lockedUntil) return

      // normal auto rotation
      setActive((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    }, 3000)

    return () => clearInterval(timer)
  }, [lockedUntil, images.length])

  const handleMouseMove = (e: any) => {
    // @ts-ignore
    const bounds = imgRef?.current?.getBoundingClientRect()
    const x = e.clientX - bounds.left
    const y = e.clientY - bounds.top
    const xPercent = (x / bounds.width) * 100
    const yPercent = (y / bounds.height) * 100

    setTransformOrigin(`${xPercent}% ${yPercent}%`)
  }

  const handleMouseLeave = () => {
    setTransformOrigin("center center")
  }

  // when a thumbnail is clicked
  const handleClick = (i: number) => {
    setActive(i)
    setLockedUntil(Date.now() + 10000) // lock for 10 seconds
  }

  return (
    <div className="p-4 flex flex-col gap-2 w-full md:w-max">
      <div className="w-full flex items-center justify-center overflow-hidden">
        <div className="overflow-hidden flex items-center justify-center w-full max-w-lg">
          <img
            ref={imgRef}
            // @ts-ignore
            src={`${images[active].url}`}
            alt=""
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-xl sm:min-w-md aspect-square rounded-sm object-cover transition-transform duration-300 hover:scale-180"
            style={{ transformOrigin }}
          />
        </div>
      </div>

      <div className="flex gap-2 w-full justify-center flex-wrap">
        {images.map((image, i) => (
          <div className={`${active === i && "border-black rounded"}`} key={i}>
            <img
              // @ts-ignore
              src={`${image.url}`}
              alt=""
              className={`object-cover w-20 h-20 sm:w-24 sm:h-24 rounded-sm cursor-pointer hover:opacity-80 transition border ${
                active === i ? "opacity-70" : "border-white"
              }`}
              onClick={() => handleClick(i)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageContainer
