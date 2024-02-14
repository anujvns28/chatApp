import { combineReducers } from "@reduxjs/toolkit"
import  userReducer  from "../slice/user"
import currentChat from "../slice/currentChat"


const rootReducer = combineReducers({
 user : userReducer,
 chat : currentChat
})

export default rootReducer