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

export const setNotification = (message, time) => dispatch => {
  dispatch(showNotification(message))
  setTimeout(() => dispatch(hideNotification()), time * 1000)
}

export default notificationSlice.reducer
