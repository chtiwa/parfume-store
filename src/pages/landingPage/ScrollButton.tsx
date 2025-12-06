import { useEffect, useState } from "react"

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(true)

  // hide button only when at the very bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const bottomThreshold = document.body.offsetHeight - 100 // full height
      console.log(scrollPosition, bottomThreshold)
      setIsVisible(scrollPosition < bottomThreshold)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // scroll to form section
  const scrollToForm = () => {
    const form = document.getElementById("landing-page-form") // your form’s ID
    if (form) {
      form.scrollIntoView({ behavior: "smooth" })
    }
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
