import authReducer, {AuthState} from './auth-slice';
import { configureStore } from "@reduxjs/toolkit";

export interface State {
    auth: AuthState
}

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store;
