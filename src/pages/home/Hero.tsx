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
    <div className="w-full flex flex-col gap-4 px-8 py-4">
      <div className="bg-gray-50 px-4 pb-8 pt-16 md:pt-8 flex flex-col md:flex-row items-center justify-center overflow-hidden rounded shadow border border-gray-200">
        <div className="flex flex-col h-full items-center justify-center gap-8 w-full">
          <h3 className="font-bold altfont text-xl sm:text-4xl w-full text-center">
            Collection d'été
          </h3>
          <button
            className="px-6 pt-2.5 pb-3 altfont bg-black text-white rounded hover:bg-white hover:cursor-pointer hover:text-black border hover:border-black hover:scale-110 transition duration-200"
            onClick={() => navigate("/homme")}
          >
            Clickez ici!
          </button>
        </div>
        <img
          src="/parfum1.webp"
          alt=""
          className="object-cover max-w-sm xl:max-w-md"
        />
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col lg:flex-row-reverse items-center bg-gray-50 px-4 pt-4 pb-16 md:pb-8 rounded shadow border border-gray-200 w-full gap-4">
          <img
            src="/parfum3.webp"
            alt="Collection Femme"
            className="w-40 sm:w-48 object-contain"
          />
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h3 className="altfont text-xl">Collection Femme</h3>
            <button
              className="px-4 pt-1.5 pb-2 altfont hover:cursor-pointer bg-black text-white rounded hover:bg-white hover:text-black border hover:border-black hover:scale-110 transition duration-200"
              onClick={() => navigate("/femme")}
            >
              Cliquez ici!
            </button>
          </div>
        </div>

        {/* Collection Homme */}
        <div className="flex flex-col lg:flex-row items-center bg-gray-50 px-4 pt-4 pb-16 md:pb-8 rounded shadow border border-gray-200 w-full gap-4">
          <img
            src="/parfum2.webp"
            alt="Collection Homme"
            className="w-40 sm:w-48 object-contain"
          />
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h3 className="altfont text-xl">Collection Homme</h3>
            <button
              className="px-4 pt-1.5 pb-2 altfont hover:cursor-pointer bg-black text-white rounded hover:bg-white hover:text-black border hover:border-black hover:scale-110 transition 
            duration-200"
              onClick={() => navigate("/homme")}
            >
              Cliquez ici!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
