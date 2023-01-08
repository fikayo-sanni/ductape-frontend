import { actionsClient } from "../clients/actions.client";
import {
  ACTIONS_CREATE_RESPONSES,
  ACTIONS_CREATE_URL,
  ACTIONS_FETCH_RESPONSES,
  ACTION_FETCH_URL,
  SETUP_FETCH_URL,
  ACTION_UPDATE_DATA,
  APP_CREATE_WEBHOOK,
} from "../config/urls";
import { Parameterize } from "../config/constant";

export const createActions = async (payload) => {
  try {
    const {
      token,
      user_id,
      app_id,
      public_key,
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
        user_id,
        app_id,
        public_key,
        description,
        resource,
        httpVerb,
        tag,
        type,
        name,
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