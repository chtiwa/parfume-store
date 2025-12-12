import { useEffect, useState } from "react"

sconst ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const bottomThreshold = document.body.offsetHeight - 100
      setIsVisible(scrollPosition < bottomThreshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // scroll to bottom
  const scrollToForm = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToForm}
      className="z-10 fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center px-8 py-2.5 border border-gray-500 font-bold text-xl text-white bg-black hover:scale-105 hover:border-green-500 transition duration-300 cursor-pointer rounded w-full max-w-lg animate-bounce"
    >
      احصل عليه الآن
    </button>
  )
}

export default ScrollButton
