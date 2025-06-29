import { createSlice } from "@reduxjs/toolkit"

interface ModalsProps {
  isSidebarOpen: boolean
  isSuccessModalOpen: boolean
  isSearchModalOpen: boolean
  orderedProductTitle: string
}

const initialState: ModalsProps = {
  isSidebarOpen: false,
  isSuccessModalOpen: false,
  isSearchModalOpen: false,
  orderedProductTitle: ""
}

const modals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload
    },
    setIsSearchModalOpen: (state, action) => {
      state.isSearchModalOpen = action.payload
    },
    setIsSuccessModalOpen: (state, action) => {
      state.isSuccessModalOpen = action.payload.isSuccessModalOpen
      state.orderedProductTitle = action.payload.orderedProductTitle
    }
  }
})

export const { setIsSidebarOpen, setIsSuccessModalOpen, setIsSearchModalOpen } =
  modals.actions

export default modals.reducer
