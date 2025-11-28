import { useEffect, useRef, useState } from "react"
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface ImageContainerI {
  images: { url: string; alt?: string }[]
}

const MAX_THUMBNAILS = 10
const AUTO_ROTATE_INTERVAL = 4000
const LOCK_DURATION = 10000 // 10 seconds

const ImageContainer = ({ images }: ImageContainerI) => {
  const [active, setActive] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [transformOrigin, setTransformOrigin] = useState("center center")
  const [lockUntil, setLockUntil] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (images.length <= 1 || isFullScreen) return

    const interval = setInterval(() => {
      if (Date.now() < lockUntil) return // skip if locked
      setActive((prev) => (prev + 1) % images.length)
    }, AUTO_ROTATE_INTERVAL)

    return () => clearInterval(interval)
  }, [images.length, isFullScreen, lockUntil])

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current || isFullScreen) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setTransformOrigin(`${x}% ${y}%`)
  }

  const handlePrev = () =>
    setActive((prev) => (prev - 1 + images.length) % images.length)
  const handleNext = () => setActive((prev) => (prev + 1) % images.length)

  const handleThumbnailClick = (i: number) => {
    setActive(i)
    setLockUntil(Date.now() + LOCK_DURATION) // lock auto-rotation
  }

  return (
    <div className="relative flex flex-col-reverse items-center justify-center gap-5 px-4 py-6 md:max-w-6xl mx-auto">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-row md:gap-3 gap-2 justify-center items-center ">
          {images.slice(0, MAX_THUMBNAILS).map((img, i) => (
            <button
              key={i}
              onClick={() => handleThumbnailClick(i)}
              className={`relative rounded-lg overflow-hidden ring-2 transition-all duration-300 flex-shrink-0 ${
                active === i
                  ? "ring-green-500 shadow-md shadow-green-200"
                  : "ring-transparent hover:ring-gray-300"
              }`}
            >
              <img
                src={img.url}
                alt={img.alt || `Thumbnail ${i + 1}`}
                className="object-cover max-w-24"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div
        className="relative flex justify-center items-center overflow-hidden rounded-xl shadow-md bg-gray-50 w-full max-w-[400px] md:max-w-[500px] cursor-zoom-in"
        onClick={() => setIsFullScreen(true)}
      >
        <img
          ref={imgRef}
          src={images[active]?.url}
          alt={images[active]?.alt || `Image ${active + 1}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTransformOrigin("center center")}
          className="w-full object-cover transition-transform duration-300 hover:scale-110 rounded-xl"
          style={{ transformOrigin }}
        />
      </div>

      {/* Fullscreen Overlay */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-4 right-4 text-white text-2xl hover:text-red-500 transition hover:cursor-pointer"
          >
            <FaTimes />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-3xl opacity-50 hover:opacity-100 transition hover:cursor-pointer"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-3xl opacity-50 hover:opacity-100 transition hover:cursor-pointer"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          <img
            src={images[active]?.url}
            alt={images[active]?.alt || `Image ${active + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg transition-opacity duration-300"
          />
        </div>
      )}
    </div>
  )
}

export default ImageContainer
