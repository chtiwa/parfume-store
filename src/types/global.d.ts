interface FacebookPixel {
  (command: "init", pixelId: string): void
  (command: "track", event: string, parameters?: Record<string, unknown>): void
  (
    command: "trackCustom",
    event: string,
    parameters?: Record<string, unknown>
  ): void
  push: (...args: unknown[]) => void
}

interface TikTokPixel {
  (command: "load", pixelId: string, options?: Record<string, unknown>): void
  (command: "page"): void
  (command: "track", event: string, parameters?: Record<string, unknown>): void
  push: (...args: unknown[]) => void
}

declare global {
  interface Window {
    fbq?: FacebookPixel
    ttq?: TikTokPixel
  }
}
export {}
