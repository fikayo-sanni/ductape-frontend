import { actionsClient } from "../clients/actions.client";
import {
  ACTIONS_CREATE_RESPONSES,
  ACTIONS_CREATE_URL,
  ACTIONS_FETCH_RESPONSES,
  ACTION_FETCH_URL,
  SETUP_FETCH_URL,
  ACTIONS_FETCH_FOLDERS,
  ACTION_UPDATE_DATA,
  APP_CREATE_WEBHOOK,
  ACTIONS_IMPORT_POSTMAN,
  APP_UPDATE_WEBHOOK,
  ACTIONS_FETCH_EVENT
} from "../config/urls";
import { Parameterize } from "../config/constant";

export const createActions = async (payload) => {
  try {
    const {
      token,
      user_id,
      app_id,
      public_key,
      folder_id,
      description,
      resource,
      httpVerb,
      tag,
      type,
      name,
    } = payload;
    return actionsClient(`Bearer ${token}`, "application/json").post(
      ACTIONS_CREATE_URL,
      {
        public_key,
        user_id,
        description,
        resource,
        app_id,
        folder_id,
        httpVerb,
        type,
        tag,
        name
    }
    );
  } catch (e) {
    throw e;
  }
};

export const fetchAction = async (payload) => {
  try {
    const { token, action_id, user_id, public_key } = payload;

    const URL = Parameterize(ACTION_FETCH_URL, ":action_id", action_id);

    return actionsClient(`Bearer ${token}`, "application/json").get(
      `${URL}?user_id=${user_id}&public_key=${public_key}`
    );
  } catch (e) {
    throw e;
  }
};

export const fetchEvent = async (payload) => {
  try {
    const { token, webhook_id, user_id, public_key } = payload;

    const URL = Parameterize(ACTIONS_FETCH_EVENT, ":webhook_id", webhook_id);

    return actionsClient(`Bearer ${token}`, "application/json").get(
      `${URL}?user_id=${user_id}&public_key=${public_key}`
    );
  } catch (e) {
    throw e;
  }
};

export const fetchFolders = async (payload) => {
  try {
    const { token, app_id, user_id, public_key } = payload;

    const URL = Parameterize(ACTIONS_FETCH_FOLDERS, ":app_id", app_id);

    return actionsClient(`Bearer ${token}`, "application/json").get(
      `${URL}?user_id=${user_id}&public_key=${public_key}`
    );
  } catch (e) {
    throw e;
  }
};

export const updateActionData = async (payload) => {
  try {
    const { token, action_id, category } =
      payload;

    let URL = Parameterize(ACTION_UPDATE_DATA, ":action_id", action_id);
    URL = Parameterize(URL,":category", category);
    //alert(JSON.stringify(payload));

    return actionsClient(`Bearer ${token}`, "application/json").post(URL, payload);
  } catch (e) {
    throw e;
  }
};

export const fetchActionData = async (payload) => {
  try {
    const { token, action_id, category, user_id, public_key, entity_id } =
      payload;

    let URL = Parameterize(ACTION_UPDATE_DATA, ":action_id", action_id);
    URL = Parameterize(URL, ":category", category);
    //alert(JSON.stringify(payload));

    let URL_EXT = `?user_id=${user_id}&public_key=${public_key}`
    if(entity_id) URL_EXT = `${URL_EXT}&entity_id=${entity_id}`;

    return actionsClient(`Bearer ${token}`, "application/json").get(
      `${URL}${URL_EXT}`,
      payload
    );
  } catch (e) {
    throw e;
  }
};

export const createResponse = async (payload) => {
  try {

    const { token } = payload;
    let URL = ACTIONS_CREATE_RESPONSES;
    delete payload.token

    return actionsClient(`Bearer ${token}`, "application/json").post(URL,payload)

  } catch (e) { 
    throw e;
  }
}

export const fetchResponses = async(payload) => {
  const {token, action_id, user_id, public_key} = payload;

  let URL = Parameterize(ACTIONS_FETCH_RESPONSES, ":action_id", action_id);

  return actionsClient(`Bearer ${token}`, "application/json").get(`${URL}?user_id=${user_id}&public_key=${public_key}`)

}

export const createAppWebhook = async (payload) => {
  try {

    const {
      token,
      app_id,
      public_key,
      user_id
    } = payload;

    const URL = Parameterize(APP_CREATE_WEBHOOK, ":app_id", app_id);

    // alert(JSON.stringify(payload));

    delete payload.token;
    delete payload.app_id;
    return actionsClient(`Bearer ${token}`, "application/json").post(URL, {
      public_key,
      user_id,
      ...payload
    });

  } catch (e) {
    throw e;
  }
}

export const updateAppWebhook = async (payload) => {
  try {
      const { token, webhook_id } = payload;

      const URL = Parameterize(APP_UPDATE_WEBHOOK, ':webhook_id', webhook_id);

      delete payload.token;
      delete payload.webhook_id;
      return actionsClient(`Bearer ${token}`, 'application/json').put(URL, {
          ...payload
      });
  } catch (e) {
      throw e;
  }
};

export const importPostman = async (payload) => {
  try {
    const {
      token,
      app_id,
      public_key,
      user_id,
      files,
      type,
      workspace_id,
    } = payload;

    const URL = ACTIONS_IMPORT_POSTMAN;
    const formData = new FormData();

    formData.append('public_key', public_key);
    formData.append('user_id', user_id);
    formData.append('app_id', app_id);
    formData.append('files', files);
    formData.append('type', type);
    formData.append('workspace_id', workspace_id);

    return actionsClient(`Bearer ${token}`, "application/json").post(URL,formData)

  } catch (e) {
    throw e;
  }
};
