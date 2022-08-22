export const USER_BASE_URL = "https://ductape-users.herokuapp.com";
export const USER_CREATE_URL = "/users/v1/create";
export const USER_LOGIN_URL = "/users/v1/login";
export const USER_FORGOT_URL = "/users/v1/forgot";

export const WORKSPACES_BASE_URL = "https://ductape-workspaces.herokuapp.com";
export const WORKSPACE_CREATE_URL = "/workspaces/v1/create";
export const WORKSPACE_FETCH_URL = "/workspaces/v1/fetch/:user_id";
export const WORKSPACE_DEFAULT_CHANGE = "/workspaces/v1/update/:user_id";
export const WORKSPACE_UPDATE_ENVS = "/workspaces/v1/update/:workspace_id/defaults/envs";

export const APPS_BASE_URL = "https://ductape-apps.herokuapp.com";
export const APPS_CREATE_URL = "/apps/v1/create";
export const APPS_FETCH_URL = "/apps/v1/workspace/:workspace_id";
export const APP_FETCH_URL = "/apps/v1/:app_id"

export const ENV_UPDATE_URL = "/apps/v1/env/:env_id"

export const ACTIONS_BASE_URL = "https://ductape-actions.herokuapp.com";
export const ACTIONS_CREATE_URL = "/actions/v1/create";
export const ACTION_FETCH_URL = "/actions/v1/:action_id"