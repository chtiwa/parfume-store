import { create } from "zustand"

interface ModalsState {
  isPopupOpen: boolean
  setIsPopupOpen: (isPopupOpen: boolean) => void
}

export const useModalsStore = create<ModalsState>((set) => ({
  isPopupOpen: false,
  setIsPopupOpen: (isPopupOpen) => set(() => ({ isPopupOpen: isPopupOpen }))
}))
