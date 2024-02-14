import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  signupData : null,
  token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSignupData : (state,action) =>{
      state.signupData = action.payload
    },
    setToken : (state,action) =>{
      state.token = action.payload
    },
    setUser : (state,action) =>{
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSignupData,setToken,setUser} = userSlice.actions

export default userSlice.reducer