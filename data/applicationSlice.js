import {createSlice, PayloadAction} from '@reduxjs/toolkit'

/** export interface AppState {
    user?: CurrentUser,
    preferences?: Preferences,
    isAuthenticated: boolean,
    stats? : any
    lastUpdated: Date
}

export interface Preferences {
    loanRate: number,
    minimumLoanAmount: number,
    maximumLoanAmount: number,
    loanFee: number,
    loanInterestRate: number,
    bankAccounts: string[],
}

export interface CurrentUser {
    fullName: string,
    token: string,
    id: string,
    permission: string[],
    // email: string,
    // phoneNumber: string,
}*/

export const initialState = {
    isAuthenticated: false,
    user: {},
    workspaces: [],
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
            state.apps = payload
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
    changeWorkspaces,
    changeDefaultWorkspaceId,
    clearData,
} = applicationSlice.actions

export default applicationSlice.reducer