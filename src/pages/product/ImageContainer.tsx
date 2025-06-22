import { useEffect, useState } from "react"

interface ImageContainerI {
  images: string[]
}

const ImageContainer = ({ images }: ImageContainerI) => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (active < images.length - 1) {
        setActive((prev) => prev + 1)
      } else {
        setActive(0)
      }
    }, 3000)
    return () => clearInterval(timer)
  }, [active])

  return (
    <div className="p-4 flex flex-col gap-2 w-full md:w-max">
      <img
        src={`/${images[active]}`}
        alt=""
        className="w-xl h-[576px] mx-auto object-cover rounded-sm"
      />
      <div className="flex gap-2 w-full justify-center flex-wrap">
        {images.map((image, i) => (
          <div className={`${active === i && "border-black rounded"}`} key={i}>
            <img
              src={`/${image}`}
              alt=""
              className={`object-cover w-20 h-20 sm:w-24 sm:h-24 rounded-sm cursor-pointer hover:opacity-80 transition border ${
                active === i ? "opacity-70" : "border-white"
              }`}
              onClick={() => setActive(i)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageContainer
