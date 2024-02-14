import { toast } from "react-toastify";
import { setToken, setUser } from "../../slice/user";
import { authEndPoints } from "../api";
import { apiConnector } from "../apiConnecter";

const {
    GET_OTP_API,
    SIGNUP_API,
    LOGIN_API
} = authEndPoints



export const getOtp = async (email,navigate) => {
    console.log(GET_OTP_API,"this is url")
    const toastId = toast.loading("loading...")
    try {
        const response = await apiConnector("POST", GET_OTP_API,{email:email});
        console.log("otp response", response);
        navigate("/verfyEmail")
        
    }
    catch (error) {
        console.log("OTP RESPONSE  API ERROR....", error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)

}


export const createAccount = async (data,navigate) => {
    const toastId = toast.loading("loading...")
    try {
        const response = await apiConnector("POST",
         SIGNUP_API,
         data,
         {
            "Content-Type": "multipart/form-data",
          }
         );
        console.log("signup response", response);
        toast.success("Signup Successfully")
        navigate("/login")
    }
    catch (error) {
        console.log("signup  RESPONSE  API ERROR....", error);
         toast.error("try Again")
    }
    toast.dismiss(toastId)
}

export const loginUser = async (data,dispatch,navigate) => {
    const toastId = toast.loading("loading...")
    try {
        const response = await apiConnector("POST",
         LOGIN_API,
         data,
         );
        console.log("Login  response", response);

         localStorage.setItem("token",JSON.stringify(response.data.token))
         localStorage.setItem("user",JSON.stringify(response.data.user))
         dispatch(setToken(response.data.token))
         dispatch(setUser(response.data.user))
         toast.success("Login successfull")
         navigate("/")
        
    }
    catch (error) {
        console.log("Login  RESPONSE  API ERROR....", error);
       toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)

}


// log out

export const logout = (dispatch,navigate) =>{
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    toast.success("Logout Successfully")
    navigate("/login")
}