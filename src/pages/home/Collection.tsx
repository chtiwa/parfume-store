import { FaLongArrowAltRight } from "react-icons/fa"

const Collection = () => {
  return (
    <div className="flex flex-col p-8">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 group cursor-pointer">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="overflow-hidden">
            <img
              src="/parfum-homme.webp"
              alt="parfum homme"
              className="w-full bg-center bg-cover hover:scale-110 transition duration-300"
            />
          </div>
          <div className="flex items-center mt-2 mb-4 gap-4 group-hover:animate-pulse">
            <h3 className="font-semibold altfont">Parfum Homme</h3>
            <FaLongArrowAltRight size={20} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 group cursor-pointer">
          <div className="overflow-hidden">
            <img
              src="/parfum-femme.jpg"
              alt="parfum femme"
              className="w-full bg-center bg-cover hover:scale-110 transition duration-300"
            />
          </div>
          <div className="flex items-center mt-2 mb-4 gap-4  cursor-pointer group-hover:animate-pulse">
            <h3 className="font-semibold altfont">Parfum Femme</h3>
            <FaLongArrowAltRight size={20} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection
