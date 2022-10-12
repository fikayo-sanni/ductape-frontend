import { actionsClient } from "../clients/actions.client";
import { ACTIONS_CREATE_URL, ACTION_FETCH_URL } from "../config/urls";
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
      name
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
        name
      }
    );
  } catch (e) {
    throw e;
  }
};


export const fetchAction = async (payload) => {
  try {

    const {
      token,
      action_id,
      user_id,
      public_key
    } = payload;

    const URL = Parameterize(ACTION_FETCH_URL, ":action_id", action_id);

    return actionsClient(`Bearer ${token}`, "application/json").get(
      `${URL}?user_id=${user_id}&public_key=${public_key}`
    )
  } catch (e) {
    throw e;
  }
}

export const updateActionHeaders = async (payload) => {
  try {

  } catch(e) {
    throw e;
  }
}