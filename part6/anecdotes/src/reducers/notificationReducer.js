import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        display: 'none'
    },
    reducers: {
        notify: (state, action) => action.payload
    }
})

export const { notify } = notificationSlice.actions
export default notificationSlice.reducer