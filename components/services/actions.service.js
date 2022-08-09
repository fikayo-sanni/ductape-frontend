import { actionsClient } from "../clients/actions.client";
import { ACTIONS_CREATE_URL } from "../config/urls";
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
      }
    );
  } catch (e) {
    throw e;
  }
};
