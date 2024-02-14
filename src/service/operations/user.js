import { toast } from "react-toastify";
import { userEndPoints } from "../api";
import { apiConnector } from "../apiConnecter";
import { setUser } from "../../slice/user";

const {
    ACCEPT_FRAIND_REQUST_API,
    FETCH_CONTACT_API,
    SEND_FRAIND_REQUST_API,
    BLOCK_USER_API,
    UNBLOCK_USER_API,
    GET_USERDATA_API,
    ADD_USER_IN_CONTACT_API,
    DELETE_USER_API,
    GET_ALL_USERS_API,
    CHANGE_USER_ABOUT_API,
    CHANGE_USER_IMG_API,
    CHANGE_USER_NAME_API,
    FETCH_USER_REQUEST_API,
    ADD_STATUS_API,
    FETCH_STATUS_API,
    DELETE_STATUS_API,
    REQEST_USER_DATA_API
} = userEndPoints



export const acceptRequest = async (data,navigate,dispatch) => {
    let result
    const toastId = toast.loading("loading...")
    try {
        const response = await apiConnector("POST", ACCEPT_FRAIND_REQUST_API,data);
        //console.log("accept request response", response);
        result = response
        dispatch(setUser(response.data.data))
        localStorage.setItem("user",JSON.stringify(response.data.data))
        toast.success("Successfully Accept Request")
        navigate("/")
    }
    catch (error) {
        console.log("accept request RESPONSE  API ERROR....", error);
        toast.error("Try again")
    }
    toast.dismiss(toastId)
    return result

}


export const fetchAcceptRequestData = async (data) => {
    let result
    const toastId = toast.loading("loading...")
    try {
        const response = await apiConnector("POST", REQEST_USER_DATA_API,{token:data});
        //console.log("accept request response", response);
        result = response
    }
    catch (error) {
        console.log("accept request RESPONSE  API ERROR....", error);
    }
    toast.dismiss(toastId)
    return result

}


export const fetchContact = async (data) => {
    let result
    try {
        const response = await apiConnector("POST", FETCH_CONTACT_API,{userId:data});
       // console.log("Fetching contact request response", response);
        result = response
    }
    catch (error) {
        console.log("Fetching contact RESPONSE  API ERROR....", error);
       
    }
    return result
}

export const sendFraindRequest = async (data) => {
    let result
    const loading = toast.loading("loading...")
    try {
        const response = await apiConnector("POST",SEND_FRAIND_REQUST_API,data);
        //console.log("send fraind request response", response);
        result = response
        toast.success("Fraind Request Sent Successfully")
    }
    catch (error) {
        console.log("send fraind request RESPONSE  API ERROR....", error);
        toast.error("Error in Sending Fraind Request")
    }
    toast.dismiss(loading);
    return result
}

// block user

export const blockContact = async (data,dispatch) => {
    let result
    const toastId = toast.loading("loading...")
    try {  
        const response = await apiConnector("POST", BLOCK_USER_API,data);
        //console.log("block user response", response);
        dispatch(setUser(response.data.data))
        localStorage.setItem("user",JSON.stringify(response.data.data))
        result = response
        toast.success("User Blocked successfully")
    }
    catch (error) {
        console.log("block user API ERROR....", error);
        toast.error("Error occured in blocking")
    }
    toast.dismiss(toastId)
    return result

}

// block user


export const unblockContact = async (data,dispatch) => {
    let result
    const toastId = toast.loading("loading..")
    try {  
        const response = await apiConnector("POST", UNBLOCK_USER_API,data);
        //console.log("unblock user response", response);
        dispatch(setUser(response.data.data))
        localStorage.setItem("user",JSON.stringify(response.data.data))
        result = response
        toast.success("User unblocked successfully")
    }
    catch (error) {
        console.log("unblock user API ERROR....", error);
        toast.error("Error occured in unblocking")
    }
    toast.dismiss(toastId)
    return result

}

// get userDAta
export const fetchUserInformaion = async (data,dispatch) => {
    let result
    try {  
        const response = await apiConnector("POST",GET_USERDATA_API ,{userId:data});
        //console.log("fetching user information response", response);
        result = response
        dispatch(setUser(response.data.data))
        localStorage.setItem("user",JSON.stringify(response.data.data))
    }
    catch (error) {
        console.log("fetching user  information  API ERROR....", error);
    }
    return result

}


export const deletContact = async (data,dispatch) => {
    let result
    const toastId = toast.loading("loading..")
    try {  
        const response = await apiConnector("POST",DELETE_USER_API,data);
        console.log("delete user response", response);
        result = response
        dispatch(setUser(response.data.data))
        localStorage.setItem("user",JSON.stringify(response.data.data))
        toast.success("User deleted successfully")
    }
    catch (error) {
        console.log("deletion user API ERROR....", error);
        toast.error("Error occured in deleting")
    }
    toast.dismiss(toastId)
    return result

}

export const addUserInConatact = async (data,dispatch) => {
    let result
    try {  
        const response = await apiConnector("POST", ADD_USER_IN_CONTACT_API,data);
        console.log("add user response", response);
        result = response
        dispatch(setUser(response.data.data))
        localStorage.setItem("user",JSON.stringify(response.data.data))
        toast.success("User added successfully")
    }
    catch (error) {
        console.log("add user API ERROR....", error);
        toast.error("Error occured in adding")
    }
    return result

}

export const fetchAllUser = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST",GET_ALL_USERS_API ,{userId:data});
        console.log("Geta all user response", response);
        result = response
    }
    catch (error) {
        console.log("all user fetching API ERROR....", error);
    }
    return result
}

export const changeUserImg = async (data,dispatch) => {
    let result
    const toastId = toast.loading("loading...")
    try {  
        const response = await apiConnector(
            "POST",
            CHANGE_USER_IMG_API,
            data,
            {
                "Content-Type": "multipart/form-data",
            }
            );
        console.log(" Change User img response", response);
        result = response
        dispatch(setUser(response.data.data))
        localStorage.setItem("user",JSON.stringify(response.data.data))
        toast.success("Dp Change Successfully")
    }
    catch (error) {
        console.log(" Dp  API ERROR....", error);
        toast.error("Error occured in change user img")
    }
    toast.dismiss(toastId)
    return result
}

export const changeUserName = async (data,dispatch) => {
    let result
    const toastId = toast.loading("loading..")
    try {  
        const response = await apiConnector("POST",CHANGE_USER_NAME_API,data);
        console.log(" Change User Name response", response);
        result = response
        dispatch(setUser(response.data.data))
        localStorage.setItem("user",JSON.stringify(response.data.data))
        toast.success("User Name Change Successfully")
    }
    catch (error) {
        console.log("change User Name  API ERROR....", error);
        toast.error("Error occured in change User Name")
    }
    toast.dismiss(toastId)
    return result
}

export const changeUserDesc = async (data,dispatch) => {
    let result
    const toastId = toast.loading("loading..")
    try {  
        const response = await apiConnector("POST",CHANGE_USER_ABOUT_API,data);
        console.log(" Change user desc response", response);
        result = response
        dispatch(setUser(response.data.data))
        localStorage.setItem("user",JSON.stringify(response.data.data))
        toast.success("user desc Change Successfully")
    }
    catch (error) {
        console.log("user group desc  API ERROR....", error);
        toast.error("Error occured in change group user")
    }
    toast.dismiss(toastId)
    return result
}

export const fetchUserRequest = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST",FETCH_USER_REQUEST_API,data);
        console.log("fetch User Request", response);
        result = response
    }
    catch (error) {
        console.log("user group desc  API ERROR....", error);
    }
    return result
}

export const createStatus = async (data) => {
    let result
    let toastId = toast.loading("loading...")
    try {  
        const response = await apiConnector(
            "POST"
        ,ADD_STATUS_API,
        data,
        {
            "Content-Type": "multipart/form-data",
        }
        );
        console.log(" adding status response", response);
        result = response
        toast.success("status added Successfully")
    }
    catch (error) {
        console.log("status adding API ERROR....", error);
        toast.error("Error occured in adding status");
    }
    toast.dismiss(toastId)
    return result
}

export const fetchUserStatus = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST",FETCH_STATUS_API,data);
        console.log("fetch User  Status", response);
        result = response
    }
    catch (error) {
        console.log("user status fetching  API ERROR....", error);
    }
    return result
}

export const deleteStatus = async (data) => {
    let result
    const toastId = toast.loading("loading...")
    try {  
        const response = await apiConnector(
            "POST",
            DELETE_STATUS_API,
            data,
            );
        console.log(" Delete status response", response);
        result = response
        toast.success("status deleted Successfully")
    }
    catch (error) {
        console.log(" status Deletion ERROR....", error);
        toast.error("Error occured in Deleting status")
    }
    toast.dismiss(toastId)
    return result
}