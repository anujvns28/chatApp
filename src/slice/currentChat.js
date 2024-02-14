import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chat : null
}

export const currentChatSlice = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {
    setCurrentChat : (state,action) => {
        state.chat = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setCurrentChat } = currentChatSlice.actions

export default currentChatSlice.reducer