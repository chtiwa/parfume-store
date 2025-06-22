import { createSlice } from "@reduxjs/toolkit"

interface ModalsProps {
  isSuccessModalOpen: boolean
  isSidebarOpen: boolean
}

const initialState: ModalsProps = {
  isSidebarOpen: false,
  isSuccessModalOpen: false
}

const modals = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action) => {
      console.log(action.payload)
      state.isSidebarOpen = action.payload
    },

    setIsSuccessModalOpen: (state, action) => {
      state.isSuccessModalOpen = action.payload
    }
  }
})

export const { setIsSidebarOpen, setIsSuccessModalOpen } = modals.actions

export default modals.reducer
