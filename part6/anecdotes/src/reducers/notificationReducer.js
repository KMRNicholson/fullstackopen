import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  display: 'none'
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload
      state.display = ''
    },
    hideNotification: () => initialState,
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
