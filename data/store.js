import {configureStore} from '@reduxjs/toolkit'
import applicationReducer from "./applicationSlice";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'ductape',
    storage,
}

const persistedReducer = persistReducer(persistConfig, applicationReducer)

const store = configureStore({
    reducer: {
        app: persistedReducer
    }
})

export default store;