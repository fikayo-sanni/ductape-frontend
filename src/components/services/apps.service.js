import { appsClient } from '../clients/apps.client';
import {
    APPS_CREATE_URL,
    APPS_FETCH_URL,
    APP_ENV_CREATE,
    APP_FETCH_URL,
    ENV_UPDATE_URL,
    APP_CREATE_SETUP,
    APP_UPDATE_SETUP,
    APP_SETUP_FETCH,
    SETUP_FETCH_URL,
    APP_SETUP_ENV_FETCH,
    DOMAINS_FETCH_URL,
    APP_FAQ_CREATE,
    APP_FAQ_UPDATE,
    PRICING_FETCH_URL,
    PRICING_FETCH_SINGLE,
    PRICING_UPDATE_URL,
    PRICING_CREATE_URL,
    ACTIONS_FETCH_FOLDERS,
    ACTIONS_UPDATE_FOLDER, 
    ACTIONS_FETCH_ACTION,
    ACTIONS_FETCH_ACTION_ENTITY,
} from '../config/urls';
import { Parameterize } from '../config/constant';
import toast from 'react-hot-toast';
import { actionsClient } from '../clients/actions.client';
import { pricingClient } from '../clients/pricing.client';

export const createApp = async (payload) => {
    try {
        const { token, user_id, app_name, public_key, workspace_id, description } = payload;
        return appsClient(`Bearer ${token}`, 'application/json').post(APPS_CREATE_URL, {
            user_id,
            app_name,
            public_key,
            workspace_id,
            description,
        });
    } catch (e) {
        throw e;
    }
};

export const updateApp = async (payload) => {
    try {
        const { token, app_id } = payload;

        const URL = Parameterize(APP_FETCH_URL, ':app_id', app_id);

        delete payload.token;

        return appsClient(`Bearer ${token}`, 'application/json').put(URL, payload);
    } catch (e) {
        throw e;
    }
};

export const fetchWorkspaceApps = async (payload) => {
    try {
        const { token, user_id, public_key, workspace_id } = payload;

        let { status } = payload;
        if (!status) status = 'all';

        let URL = Parameterize(APPS_FETCH_URL, ':workspace_id', workspace_id);
        URL = Parameterize(URL, ':status', status);
        return appsClient(`Bearer ${token}`, 'application/json').get(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
    }
}; 

export const fetchApp = async (payload) => {
    try {
        const { token, user_id, public_key, app_id } = payload;

        const URL = Parameterize(APP_FETCH_URL, ':app_id', app_id);
        return appsClient(`Bearer ${token}`, 'application/json').get(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
    }
};

export const fetchPricing = async (payload) => {
    try {
        const { token, user_id, public_key, app_id } = payload;

        const URL = Parameterize(PRICING_FETCH_URL, ':app_id', app_id);
        return pricingClient(`Bearer ${token}`, 'application/json').get(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
    }
};

export const fetchSinglePricing = async (payload) => {
    try {
        const { token, user_id, public_key, pricing_id } = payload;

        const URL = Parameterize(PRICING_FETCH_SINGLE, ':pricing_id', pricing_id);
        return pricingClient(`Bearer ${token}`, 'application/json').get(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
    }
};

export const createPricing = async (payload) => {
    try {
        const { token } = payload;

        return pricingClient(`Bearer ${token}`, 'application/json').post(PRICING_CREATE_URL, payload);
    } catch (e) {
        throw e;
        return true;
    }
};

export const updatePricing = async (payload) => {
    try {
        const { token, pricing_id } = payload;

        const URL = Parameterize(PRICING_UPDATE_URL, ':pricing_id', pricing_id);

        return pricingClient(`Bearer ${token}`, 'application/json').put(URL, payload);
    } catch (e) {
        throw e;
        return true;
    }
};

export const fetchAppEnv = async (payload) => {
    try {
        const { token, user_id, public_key, env_id } = payload;

        const URL = Parameterize(ENV_UPDATE_URL, ':env_id', env_id);
        return appsClient(`Bearer ${token}`, 'application/json').get(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
    }
};

export const updateAppEnv = async (payload) => {
    try {
        const { token, env_id } = payload;

        const URL = Parameterize(ENV_UPDATE_URL, ':env_id', env_id);

        return appsClient(`Bearer ${token}`, 'application/json').put(URL, payload);
    } catch (e) {
        throw e;
    }
};

export const createAppEnv = async (payload) => {
    try {
        const { token, app_id, public_key, workspace_id, env_name, description, slug, user_id } = payload;

        const URL = Parameterize(APP_ENV_CREATE, ':app_id', app_id);
        return appsClient(`Bearer ${token}`, 'application/json').post(URL, {
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

export const createAppFaq = async (payload) => {
    try {
        const { token, app_id, public_key, question, answer, user_id } = payload;

        const URL = Parameterize(APP_FAQ_CREATE, ':app_id', app_id);
        return appsClient(`Bearer ${token}`, 'application/json').post(URL, {
            public_key,
            question,
            answer,
            user_id,
        });
    } catch (e) {
        throw e;
    }
};

export const updateAppFaq = async (payload) => {
    try {
        const { token, app_id, faq_id, public_key, question, answer, user_id } = payload;

        let URL = Parameterize(APP_FAQ_UPDATE, ':app_id', app_id);
        URL = Parameterize(URL, ':faq_id', faq_id);
        return appsClient(`Bearer ${token}`, 'application/json').put(URL, {
            public_key,
            question,
            answer,
            user_id,
        });
    } catch (e) {
        throw e;
    }
};

export const deleteAppFaq = async (payload) => {
    try {
        const { token, app_id, public_key, user_id, faq_id } = payload;

        let URL = Parameterize(APP_FAQ_UPDATE, ':app_id', app_id);
        URL = Parameterize(URL, ':faq_id', faq_id);
        return appsClient(`Bearer ${token}`, 'application/json').delete(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
    }
};

export const createAppSetup = async (payload) => {
    try {
        const { token, app_id, public_key, user_id } = payload;

        const URL = Parameterize(APP_CREATE_SETUP, ':app_id', app_id);

        delete payload.token;
        delete payload.app_id;
        return appsClient(`Bearer ${token}`, 'application/json').post(URL, {
            public_key,
            user_id,
            ...payload,
        });
    } catch (e) {
        throw e;
    }
}; 

export const updateAppSetup = async (payload) => {
    try {
        const { token, setup_id} = payload;

        const URL = Parameterize(APP_UPDATE_SETUP, ':setup_id', setup_id);

        delete payload.token;
        delete payload.setup_id;
        return appsClient(`Bearer ${token}`, 'application/json').put(URL, {
            ...payload
        });
    } catch (e) {
        throw e;
    }
};

export const fetchAppSetups = async (payload) => {
    try {
        const { token, app_id, public_key, user_id } = payload;

        const URL = Parameterize(APP_SETUP_FETCH, ':app_id', app_id);

        return appsClient(`Bearer ${token}`, 'application/json').get(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
    }
};

export const fetchAppSetupsEnvs = async (payload) => {
    try {
        const { token, app_id, public_key, user_id, env_id } = payload;

        let URL = Parameterize(APP_SETUP_ENV_FETCH, ':app_id', app_id);
        URL = Parameterize(URL, ':env_id', env_id);
        return appsClient(`Bearer ${token}`, 'application/json').get(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
    }
};

export const fetchSetup = async (payload) => {
    try {
        const { token, setup_id, user_id, public_key } = payload;

        const URL = Parameterize(SETUP_FETCH_URL, ':setup_id', setup_id);

        return appsClient(`Bearer ${token}`, 'application/json').get(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
    }
};

export const fetchDomains = async (payload) => {
    try {
        const { token, user_id, public_key } = payload;

        const URL = DOMAINS_FETCH_URL;

        return appsClient(`Bearer ${token}`, 'application/json').get(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
    }
};

export const fetchAction = async (payload) => {
    try {
        const { action_id, token, user_id, public_key } = payload;

        let URL = Parameterize(ACTIONS_FETCH_ACTION, ':action_id', action_id);

        return actionsClient(`Bearer ${token}`, 'application/json').get(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
        return true;
    }
};

export const fetchActionEntity = async (payload) => {
    try {
        const { action_id, category, token, user_id, public_key } = payload;

        let URL = Parameterize(ACTIONS_FETCH_ACTION_ENTITY, ':action_id', action_id);
        URL = Parameterize(URL, ':category', category);

        return actionsClient(`Bearer ${token}`, 'application/json').get(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
        return true;
    }
};

export const updateAction = async (payload) => {
    try {
        const { action_id, token, user_id, public_key } = payload;

        let URL = Parameterize(ACTIONS_FETCH_ACTION, ':action_id', action_id);

        return actionsClient(`Bearer ${token}`, 'application/json').put(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
            payload,
        );
    } catch (e) {
        throw e;
        return true;
    }
};

export const fetchActionFolders = async (payload) => {
    try {
        const { app_id, token, user_id, public_key } = payload;

        let URL = Parameterize(ACTIONS_FETCH_FOLDERS, ':app_id', app_id);

        return actionsClient(`Bearer ${token}`, 'application/json').get(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
        );
    } catch (e) {
        throw e;
        return true;
    }
};

export const updateFolder = async (payload) => {
    try {
        const { folder_id, token, user_id, public_key } = payload;

        let URL = Parameterize(ACTIONS_UPDATE_FOLDER, ':folder_id', folder_id);

        return actionsClient(`Bearer ${token}`, 'application/json').put(
            `${URL}?user_id=${user_id}&public_key=${public_key}`,
            payload,
        );
    } catch (e) {
        throw e;
        return true;
    }
};
