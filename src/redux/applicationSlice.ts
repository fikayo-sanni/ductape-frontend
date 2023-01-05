import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
    user?: CurrentUser;
    isAuthenticated: boolean;
    lastUpdated: Date;

    workspaces: [];
    workspace: any;
    apps: [];
    app: any;
    domains: [];
    defaultWorkspaceId: string;

    integrations: [];
    integration: any;

    darkMode: boolean;
    currentTheme: any;
}

export interface CurrentUser {
    firstname: string;
    lastname: string;
    token: string;
    id: string;
    email: string;
    permissions: string[]
}

const lightTheme = {
    colorBgBase: '#f9fbfd',
    colorBgContainer: '#fff',
    colorTextBase: '#333',
};

const darkTheme = {
    colorBgBase: '#191919',
    colorBgContainer: '#000',
    colorTextBase: '#fff',
};

export const initialState: AppState = {
    isAuthenticated: false,
    lastUpdated: new Date(),

    workspaces: [],
    workspace: {},
    apps: [],
    app: {},
    domains: [],
    defaultWorkspaceId: '',

    integrations: [],
    integration: {},

    darkMode: false,
    currentTheme: lightTheme,
};

export const applicationSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // uset
        setAppUser: (state: AppState, { payload }: PayloadAction<CurrentUser>) => {
            state.user = payload;
            state.isAuthenticated = true;
            state.lastUpdated = new Date();
        },
        logoutUser: (state: AppState) => {
            return initialState;
        },
        // apps
        setCurrentApp: (state: AppState, { payload }: PayloadAction<any>) => {
            state.app = payload;
        },

        changeApps: (state: AppState, { payload }: PayloadAction<string[]>) => {
            state.apps = payload;
        },

        // integrations
        changeIntegrations: (state: AppState, { payload }: PayloadAction<string[]>) => {
            state.integrations = payload;
        },
        changeSelectedIntegration: (state: AppState, { payload }: PayloadAction<any>) => {
            state.integration = payload;
        },


        // domains
        changeDomains: (state: AppState, { payload }: PayloadAction<string[]>) => {
            state.domains = payload;
        },

        //workspaces
        setWorkspaces: (state: AppState, { payload }: PayloadAction<string[]>) => {
            state.workspaces = payload;
        },
        setCurrentWorkspace: (state: AppState, { payload }: PayloadAction<any>) => {
            state.workspace = payload;
        },
        changeDefaultWorkspaceId: (state: AppState, { payload }: PayloadAction<string>) => {
            state.defaultWorkspaceId = payload;
        },

        // others
        setTheme: (state: AppState, { payload }: PayloadAction<boolean>) => {
            if (payload === true) {
                state.currentTheme = darkTheme;
                state.darkMode = true;
            } else {
                state.currentTheme = lightTheme;
                state.darkMode = false;
            }
        },

        clearData: state => {
            return initialState;
        },
    },
});

export const {
    setAppUser,
    logoutUser,
    setCurrentApp,
    setWorkspaces,
    setCurrentWorkspace,
    setTheme,
    changeIntegrations,
    changeDomains,
    changeSelectedIntegration,
    changeDefaultWorkspaceId,
} = applicationSlice.actions;

export default applicationSlice.reducer;
