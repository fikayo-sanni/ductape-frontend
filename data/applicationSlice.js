import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export const initialState = {
    isAuthenticated: false,
    user: {},
    app: {},
    workspaces: [],
    domains: [],
    defaultWorkspaceId: "",
}

export const applicationSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        logoutUser: (state) => {
            return initialState;
        },

        changeApps: (state, {payload}) => {
            state.apps = payload;
        },

        changeIntegrations: (state, {payload}) => {
            state.integrations = payload;
        },

        changeDomains: (state, {payload}) => {
            state.domains = payload;
        },

        changeSelectedIntegration: (state, {payload}) => {
            state.integration = payload;
        },

        changeSelectedApp: (state, {payload}) => {
            state.app = payload;
        },

        changeUser: (state, {payload}) => {
            state.user = payload;
        },

        changeWorkspaces: (state, {payload}) => {
            // alert(JSON.stringify(payload))
            state.workspaces = payload;
        },

        changeDefaultWorkspaceId: (state, {payload}) => {
            state.defaultWorkspaceId = payload;
        },
        clearData: state => {
            return initialState;
        }
    }
})


export const {
    changeUser,
    logoutUser,
    changeApps,
    changeIntegrations,
    changeSelectedApp,
    changeDomains,
    changeSelectedIntegration,
    changeWorkspaces,
    changeDefaultWorkspaceId,
    clearData,
} = applicationSlice.actions

export default applicationSlice.reducer