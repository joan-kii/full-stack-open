import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'message',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      state = action.payload
      return state
    },
    removeMessage(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer
