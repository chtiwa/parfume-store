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
    console.log(activeIndex)
    return () => clearInterval(timer)
  }, [activeIndex])

  return (
    <div
      className={`relative w-full h-[calc(100vh-88px)] bg-center bg-cover`}
      style={{ backgroundImage: `url('hero-${activeIndex}.webp')` }}
    >
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h3 className="text-lg sm:text-xl mb-6 font-bold altfont">
          LK PARFUMO
        </h3>
        <h1 className="text-3xl sm:text-5xl mb-4 altfont">Parfum de luxe</h1>
        <button
          className="px-4 py-2 bg-white text-black mt-4 hover:bg-black hover:border-white hover:text-white cursor-pointer transition duration-300 altfont"
          onClick={() => navigate("/homme")}
        >
          Voir Maintenant
        </button>
      </div>
    </div>
  )
}

export default Hero
