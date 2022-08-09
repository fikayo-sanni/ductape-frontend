import { userClient } from "../clients/users.client";
import { USER_CREATE_URL, USER_FORGOT_URL, USER_LOGIN_URL } from "../config/urls";

export const registerUser = async (payload) => {
    try{
        return await userClient("", "application/json").post(USER_CREATE_URL,payload)
    } catch(e) {
        throw e;
    }
}

export const loginUser = async (payload) => {
    return await userClient("", "application/json").post(USER_LOGIN_URL, payload)
}

export const forgotUser = async (payload) => {
    return await userClient("", "application/json").post(USER_FORGOT_URL, payload);
}