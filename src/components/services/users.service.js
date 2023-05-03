import { userClient } from "../clients/users.client";
import { 
    USER_CREATE_URL,
    USER_FORGOT_URL,
    USER_LOGIN_URL,
    USER_CHANGE_PASSWORD,
    USER_OTP_LOGIN,
    USER_REQUEST_OTP,
} from "../config/urls";
import { Parameterize } from "../config/constant";

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

export const changePasswordUser = async (payload) => {
    return await userClient("", "application/json").put(USER_CHANGE_PASSWORD, payload)
}

export const otpLogin = async (payload) => {
    return await userClient("", "application/json").post(USER_OTP_LOGIN, payload);
}

export const requestOtp = async (payload) => {
    const { user_id } = payload;
    const URL = Parameterize(
        USER_REQUEST_OTP,
        ":user_id",
        user_id
      );
    return await userClient("", "application/json").post(URL)
}
