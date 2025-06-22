import { createSlice } from "@reduxjs/toolkit"

interface ModalsProps {
  isSidebarOpen: boolean
  isSuccessModalOpen: boolean
  orderedProductTitle: string
}

const initialState: ModalsProps = {
  isSidebarOpen: false,
  isSuccessModalOpen: false,
  orderedProductTitle: ""
}

const modals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload
    },

    setIsSuccessModalOpen: (state, action) => {
      state.isSuccessModalOpen = action.payload.isSuccessModalOpen
      state.orderedProductTitle = action.payload.orderedProductTitle
    }
  }
})

export const { setIsSidebarOpen, setIsSuccessModalOpen } = modals.actions

export default modals.reducer
