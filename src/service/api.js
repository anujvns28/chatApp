const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndPoints = {
    GET_OTP_API : BASE_URL + "/auth/getOtp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
}

export const userEndPoints = {
    ACCEPT_FRAIND_REQUST_API : BASE_URL + "/user/acceptRequest",
    SEND_FRAIND_REQUST_API : BASE_URL + "/user/sendRequest",
    REQEST_USER_DATA_API : BASE_URL + "/user//requestUserData",
    FETCH_CONTACT_API : BASE_URL + "/user/fetchContact",
    BLOCK_USER_API : BASE_URL + "/user/blockUser",
    UNBLOCK_USER_API : BASE_URL + "/user/unBlockUser",
    GET_USERDATA_API : BASE_URL + "/user/getUser",
    DELETE_USER_API : BASE_URL + "/user/deleteUser",
    ADD_USER_IN_CONTACT_API : BASE_URL + "/user/addUserinContact",
    GET_ALL_USERS_API : BASE_URL + "/user/getAllUsers",
    CHANGE_USER_IMG_API : BASE_URL + "/user/changeUserImage",
    CHANGE_USER_NAME_API : BASE_URL + "/user/changeUserName",
    CHANGE_USER_ABOUT_API : BASE_URL + "/user/changeUserDesc",
    FETCH_USER_REQUEST_API : BASE_URL + "/user/fetchRequest",
    ADD_STATUS_API : BASE_URL + "/user/addStatus",
    FETCH_STATUS_API : BASE_URL + "/user/fetchAllStatus",
    DELETE_STATUS_API : BASE_URL + "/user/deleteStatus"
}

export const chatEndPoints = {
    SEND_GROUP_MSZ_API : BASE_URL + "/chat/sendGroupMsz",
    FETCH_GROUP_MSZ_API : BASE_URL + '/chat/fetchGroupChat',
    SEND_ONE_ONE_MSZ_API : BASE_URL + "/chat/sendOneOneMsz",
    FETCH_ONE_ONE_MSZ_API : BASE_URL + "/chat/fetchOneOneChats"
}

export const groupEndPoints = {
    CREATE_GROUP_API : BASE_URL + "/group/createGroup",
    FETCH_GROUP_API : BASE_URL + "/group/fetchGroup",
    FETCH_GROUP_INFO_API : BASE_URL + "/group/fetchGroupInfo",
    FETCH_COMMON_GROUP_API : BASE_URL + "/group/commonGroup",
    EXIST_GROUP_API : BASE_URL + "/group/existGroup",
    ADD_USER_IN_GROUP_API : BASE_URL + "/group/addUserInGroup",
    MAKE_GROUP_ADMIN_API : BASE_URL + "/group/makeroupAdmin",
    DISSMISS_GROUP_ADMIN_API : BASE_URL + "/group/dismissGroupAdmin",
    CHANGE_GROUP_IMG_API : BASE_URL + "/group/changeGroupImg",
    CHANGE_GROUP_NAME_API : BASE_URL + "/group/changeGroupName",
    CHANGE_GROUP_DESC_API : BASE_URL + "/group/changeGroupDesc",
}