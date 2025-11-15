export const getFacebookParams = () => {
  // Grab fbclid from URL
  const urlParams = new URLSearchParams(window.location.search)
  const fbclid = urlParams.get("fbclid") || ""

  // Grab fbp / fbc from cookies
  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
    return match ? match[2] : ""
  }

  const fbp = getCookie("_fbp") || ""
  const fbc = getCookie("_fbc") || ""

  return { fbclid, fbp, fbc }
}

export const getTikTokParams = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const ttclid = urlParams.get("ttclid") || ""
  return { ttclid }
}
