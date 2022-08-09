import { appsClient } from "../clients/apps.client";
import { APPS_CREATE_URL, APPS_FETCH_URL, APP_FETCH_URL, ENV_UPDATE_URL } from  "../config/urls";
import { Parameterize } from "../config/constant"

export const createApp = async(payload) => {
    try {
        const {token, user_id, app_name, public_key, workspace_id, description} = payload;
        return appsClient(`Bearer ${token}`, "application/json").post(APPS_CREATE_URL, {user_id, app_name, public_key, workspace_id, description});
    } catch (e) {
        throw e;
    }
}

export const fetchWorkspaceApps = async(payload) => {
    try {
        const {token, user_id, public_key, workspace_id} = payload;

        const URL = Parameterize(APPS_FETCH_URL, ":workspace_id", workspace_id)
        return appsClient(`Bearer ${token}`, "application/json").get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    } catch (e) {
        throw e;
    }
}

export const fetchApp = async(payload) => {
    try {

        const {token, user_id, public_key, app_id} = payload;

        const URL = Parameterize(APP_FETCH_URL, ":app_id", app_id);
        return appsClient(`Bearer ${token}`, "application/json").get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    } catch(e) {
        throw e;
    }
}

export const updateAppEnv = async(payload) => {
    try{

        const {token, env_id} = payload;

        const URL = Parameterize(ENV_UPDATE_URL, ":env_id", env_id);

        return appsClient(`Bearer ${token}`, "application/json").put(URL, payload);

    } catch (e) {
        throw e;
    }
}