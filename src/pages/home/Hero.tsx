import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeIndex < 1) {
        setActiveIndex((prev: number) => prev + 1)
      } else {
        setActiveIndex(0)
      }
    }, 10000)
    return () => clearInterval(timer)
  }, [activeIndex])

  return (
    <div className="relative w-full h-[calc(100vh-88px)] overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        // loop
        muted
        playsInline
        src={`/hero.mp4`} // adjust path as needed
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4 z-10">
        <h3 className="text-lg sm:text-xl mb-6 font-semibold ">LK PARFUMO</h3>
        <h1 className="text-3xl sm:text-5xl mb-4 font-bold ">
          Parfums de luxe
        </h1>
        <button
          className="px-4 py-2 bg-white text-black mt-4 hover:bg-black hover:border-white hover:text-white cursor-pointer transition duration-300 font-semibold"
          onClick={() => navigate("/homme")}
        >
          Voir Maintenant
        </button>
      </div>
    </div>
  )
}

export default Hero
