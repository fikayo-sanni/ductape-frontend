import { workspaceClient } from "../clients/workspace.client";
import { WORKSPACE_CREATE_URL, WORKSPACE_FETCH_URL, WORKSPACE_DEFAULT_CHANGE, WORKSPACE_UPDATE_ENVS } from  "../config/urls";
import { Parameterize } from "../config/constant"

export const createWorkspace = async(payload) => {
    try {
        const {token, user_id, name, public_key} = payload;
        return workspaceClient(`Bearer ${token}`, "application/json").post(WORKSPACE_CREATE_URL, {user_id, name, public_key})
    } catch (e) {
        throw e;
    }
}

export const fetchWorkspaces = async(payload) => {
    try {
        const {token, user_id, public_key} = payload;
        const URL = Parameterize(WORKSPACE_FETCH_URL,":user_id", user_id);
        return workspaceClient(`Bearer ${token}`, "application/json").get(`${URL}?public_key=${public_key}`)
    } catch (e) {
        throw e;
    }
}

export const updateDefaultAccess = async(payload) => {
    try {

        const {token, user_id, workspace_id, public_key} = payload;
        const URL = Parameterize(WORKSPACE_DEFAULT_CHANGE,":user_id", user_id);
        return workspaceClient(`Bearer ${token}`, "application/json").put(URL, {workspace_id, public_key})

    } catch(e) {
        throw e;
    }
}

export const updateDefaultEnvs = async(payload) => {
    try{

        const {token, user_id, workspace_id, public_key, envs} = payload;

        const URL = Parameterize(WORKSPACE_UPDATE_ENVS, ":workspace_id", workspace_id);
        return workspaceClient(`Bearer ${token}`, "application/json").put(URL, {user_id, public_key, envs});

    } catch(e) {
        throw e;
    }
}