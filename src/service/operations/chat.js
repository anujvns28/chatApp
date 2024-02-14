import { chatEndPoints } from "../api";
import { apiConnector } from "../apiConnecter";


const {
    FETCH_GROUP_MSZ_API,
    SEND_GROUP_MSZ_API,
    SEND_ONE_ONE_MSZ_API,
    FETCH_ONE_ONE_MSZ_API
} = chatEndPoints

export const sendGroupMsz = async (data) => {
    let result
    try {
        const response = await apiConnector("POST", SEND_GROUP_MSZ_API,data);
      //  console.log("Send msz response", response);
        result = response
    }
    catch (error) {
        console.log("send msz API ERROR....", error);
    }
    return result

}


export const fetchGroupMsz = async (data) => {
    let result
    try {
        const response = await apiConnector("POST", FETCH_GROUP_MSZ_API,data);
       // console.log("fetch msz response", response);
        result = response
    }
    catch (error) {
        console.log("fetch msz API ERROR....", error);
    }
    return result

}

export const sendOnetoOneMsz = async (data) => {
    let result
    try {
        const response = await apiConnector("POST", SEND_ONE_ONE_MSZ_API,data);
       // console.log("Send one one  msz response", response);
        result = response
    }
    catch (error) {
        console.log("send one one msz API ERROR....", error);
    }
    return result

}

export const fetchOneToOneMsz = async (data) => {
    let result
    try {
        const response = await apiConnector("POST", FETCH_ONE_ONE_MSZ_API,data);
        //console.log("fetch one one msz response", response);
        result = response
    }
    catch (error) {
        console.log("fetch one one msz API ERROR....", error);
    }
    return result

}