import { toast } from "react-toastify";
import { groupEndPoints } from "../api";
import { apiConnector } from "../apiConnecter";
import { setUser } from "../../slice/user";

const {
    CREATE_GROUP_API,
    FETCH_GROUP_API,
    FETCH_GROUP_INFO_API,
    FETCH_COMMON_GROUP_API,
    EXIST_GROUP_API,
    ADD_USER_IN_GROUP_API,
    MAKE_GROUP_ADMIN_API,
    DISSMISS_GROUP_ADMIN_API,
    CHANGE_GROUP_DESC_API,
    CHANGE_GROUP_IMG_API,
    CHANGE_GROUP_NAME_API
} = groupEndPoints

export const createGroup = async (data,dispatch) => {
    let result
    const toastid = toast.loading("loading...")
    try {  
        const response = await apiConnector("POST", CREATE_GROUP_API,data);
        console.log("creting group response", response);
        result = response
        dispatch(setUser(response.data.data))
        localStorage.setItem("user",JSON.stringify(response.data.data))
        toast.success("group Created Successfully")
    }
    catch (error) {
        console.log("creating group API ERROR....", error);
        toast.error("Error in Creating Group")
    }
    toast.dismiss(toastid)
    return result

}

export const fetchGroups = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST", FETCH_GROUP_API,{userId:data});
      //  console.log("fetching group response", response);
        result = response
    }
    catch (error) {
        console.log("fetching group API ERROR....", error);
    }
    return result

}

export const fetchGroupInfo = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST", FETCH_GROUP_INFO_API,{groupId:data});
      //  console.log("fetching group response", response);
        result = response
    }
    catch (error) {
        console.log("fetching group information  API ERROR....", error);
    }
    return result

}

export const fetchCommonGroup = async (data) => {
    let result
    try {  
        const response = await apiConnector("POST", FETCH_COMMON_GROUP_API,data);
        //console.log("fetching common group response", response);
        result = response
    }
    catch (error) {
        console.log("fetching common group information  API ERROR....", error);
    }
    return result

}

// exist group
export const existFromGroup = async (data,dispatch) => {
    const toastId = toast.loading("loading..")
    let result
    try {  
        const response = await apiConnector("POST", EXIST_GROUP_API,data);
        console.log("exist user response", response);
        result = response
        
        toast.success("you successfully exist from Group")
    }
    catch (error) {
        console.log("exist user API ERROR....", error);
        toast.error("Error occured in existing")
    }
    toast.dismiss(toastId)
    return result

}

// add user in group
export const addUsersInGroup = async (data) => {
    let result
    const toastId = toast.loading("loading..")
    try {  
        const response = await apiConnector("POST", ADD_USER_IN_GROUP_API,data);
        console.log("adding user in group response", response);
        result = response
        toast.success("user added successful in group")
    }
    catch (error) {
        console.log("addinguser API ERROR....", error);
        toast.error("Error occured in adding")
    }
    toast.dismiss(toastId)
    return result

}


// add user in group admi
export const makeUserGroupAdmin = async (data) => {
    let result
    const toastId = toast.loading("loading..")
    try {  
        const response = await apiConnector("POST", MAKE_GROUP_ADMIN_API,data);
        console.log("Admin  group response", response);
        result = response
        toast.success("user  successful made admin")
    }
    catch (error) {
        console.log("admin API ERROR....", error);
        toast.error("Error occured in making admin")
    }
    toast.dismiss(toastId)
    return result
}

export const dismissUserGroupAdmin = async (data) => {
    let result
    const toastId = toast.loading("loading..")
    try {  
        const response = await apiConnector("POST", DISSMISS_GROUP_ADMIN_API,data);
        console.log(" Dissmiss Admin  group response", response);
        result = response
        toast.success("user  successful dismissed As admin")
    }
    catch (error) {
        console.log("admin dismiss API ERROR....", error);
        toast.error("Error occured in dismminsging admin")
    }
    toast.dismiss(toastId)
    return result

}

export const changeGroupImg = async (data) => {
    let result
    const toastId = toast.loading("loading...")
    try {  
        const response = await apiConnector(
            "POST",
            CHANGE_GROUP_IMG_API,
            data,
            {
                "Content-Type": "multipart/form-data",
            }
            );
        console.log(" Change group img response", response);
        result = response
        toast.success("Updated Successfully")
    }
    catch (error) {
        console.log("change group img  API ERROR....", error);
        toast.error("Error occured in change group img")
    }
    toast.dismiss(toastId)
    return result
}

export const changeGroupName = async (data) => {
    let result
    const toastId = toast.loading("loading..")
    try {  
        const response = await apiConnector("POST",CHANGE_GROUP_NAME_API,data);
        console.log(" Change group Name response", response);
        result = response
        toast.success("Update Successfully")
    }
    catch (error) {
        console.log("change group Name  API ERROR....", error);
        toast.error("Error occured in change group Name")
    }
    toast.dismiss(toastId)
    return result
}

export const changeGroupDesc = async (data) => {
    let result
    const toastId = toast.loading("loading..")
    try {  
        const response = await apiConnector("POST",CHANGE_GROUP_DESC_API,data);
        console.log(" Change group desc response", response);
        result = response
        toast.success("Update Successfully")
    }
    catch (error) {
        console.log("change group desc  API ERROR....", error);
        toast.error("Error occured in change group desc")
    }
    toast.dismiss(toastId)
    return result
}