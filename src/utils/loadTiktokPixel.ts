export const loadTikTokPixel = (pixelId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject("Not in browser")

    if (window.ttq) {
      // Already loaded
      return resolve()
    }

    // Create TikTok pixel script
    const script = document.createElement("script")
    script.async = true
    script.src = `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${pixelId}&lib=ttq`

    script.onload = () => {
      if (!window.ttq) return reject("ttq still not available after load")

      // Init TikTok
      window.ttq =
        window.ttq ||
        function () {
          // @ts-ignore
          (window.ttq.q = window.ttq.q || []).push(arguments)
        }

      // @ts-ignore
      window.ttq.load(pixelId)
      // @ts-ignore
      window.ttq.page()
      resolve()
    }

    script.onerror = () => reject("Failed to load TikTok pixel")

    document.head.appendChild(script)
  })
}
