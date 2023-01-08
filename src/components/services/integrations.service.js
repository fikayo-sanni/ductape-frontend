import { integrationsClient } from "../clients/integrations.client";
import {
  INTEGRATIONS_CREATE_URL,
  INTEGRATIONS_FETCH_URL,
  INTEGRATION_FETCH_URL,
  ENV_UPDATE_URL,
  INTEGRATION_ENVS_URL,
  INTEGRATIONS_ENV_CREATE,
  INTEGRATION_APP_CREATE,
  INTEGRATION_APP_URL,
} from "../config/urls";
import { Parameterize } from "../config/constant";

export const createIntegration = async (payload) => {
  try {
    const { token, user_id, name, public_key, workspace_id, description } =
      payload;
    //alert(JSON.stringify(payload));
    return integrationsClient(`Bearer ${token}`, "application/json").post(
      INTEGRATIONS_CREATE_URL,
      { user_id, name, public_key, workspace_id, description }
    );
  } catch (e) {
    throw e;
  }
};

export const fetchWorkspaceIntegrations = async (payload) => {
  try {
    const { token, user_id, public_key, workspace_id } = payload;

    let { status } = payload;
    if (!status) status = "all";

    let URL = Parameterize(
      INTEGRATIONS_FETCH_URL,
      ":workspace_id",
      workspace_id
    );
    URL = Parameterize(URL, ":status", status);
    return integrationsClient(`Bearer ${token}`, "application/json").get(
      `${URL}?user_id=${user_id}&public_key=${public_key}`
    );
  } catch (e) {
    throw e;
  }
};

export const fetchIntegration = async (payload) => {
  try {
    const { token, user_id, public_key, integration_id } = payload;

    const URL = Parameterize(
      INTEGRATION_FETCH_URL,
      ":integration_id",
      integration_id
    );
    return integrationsClient(`Bearer ${token}`, "application/json").get(
      `${URL}?user_id=${user_id}&public_key=${public_key}`
    );
  } catch (e) {
    throw e;
  }
};

export const updateIntegrationEnv = async (payload) => {
  try {
    const { token, env_id } = payload;

    const URL = Parameterize(ENV_UPDATE_URL, ":env_id", env_id);

    return integrationsClient(`Bearer ${token}`, "application/json").put(
      URL,
      payload
    );
  } catch (e) {
    throw e;
  }
};

export const fetchIntegrationEnvs = async (payload) => {
  try {
    const { token, integration_id, user_id, public_key } = payload;

    const URL = Parameterize(
      INTEGRATION_ENVS_URL,
      ":integration_id",
      integration_id
    );

    return integrationsClient(`Bearer ${token}`, "application/json").get(
      `${URL}?user_id=${user_id}&public_key=${public_key}`
    );
  } catch (e) {
    throw e;
  }
};

export const fetchIntegrationApps = async (payload) => {
  try {
    const { token, integration_id, user_id, public_key } = payload;
    const URL = Parameterize(
      INTEGRATION_APP_URL,
      ":integration_id",
      integration_id
    );
    return integrationsClient(`Bearer ${token}`, "application/json").get(
      `${URL}?user_id=${user_id}&public_key=${public_key}`
    );
  } catch (e) {
    throw e;
  }
};

export const createIntegrationEnv = async (payload) => {
  try {
    const {
      token,
      integration_id,
      public_key,
      workspace_id,
      env_name,
      description,
      slug,
      user_id,
    } = payload;
    // alert(JSON.stringify(payload));

    const URL = Parameterize(
      INTEGRATIONS_ENV_CREATE,
      ":integration_id",
      integration_id
    );
    return integrationsClient(`Bearer ${token}`, "application/json").post(URL, {
      public_key,
      workspace_id,
      env_name,
      description,
      slug,
      user_id,
    });
  } catch (e) {
    throw e;
  }
};

export const createIntegrationApp = async (payload) => {
  try {
    const { token, user_id, public_key, integration_id, app_id, workspace_id } =
      payload;

    const URL = INTEGRATION_APP_CREATE;

    return integrationsClient(`Bearer ${token}`, "application/json").post(URL, {
      public_key,
      user_id,
      integration_id,
      app_id,
      workspace_id,
    });
  } catch (e) {
    throw e;
  }
};


// map integration environments

// create feature

// create data input 

// map data with transformations