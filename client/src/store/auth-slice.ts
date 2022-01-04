import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import LocalStorageService from "../services/storage/StorageService";

export interface User {
    firstName: string,
    lastName: string,
    email: string
}

export interface AuthState {
    currentUser: User | null,
    isAuthenticated: boolean,
}

const initialState = {
    currentUser: null,
    isAuthenticated: false,
}



export const getUserAsync = createAsyncThunk('', async () => {
    const token = LocalStorageService.getAccessToken();
    console.log(token)
    const response = await fetch(`http://localhost:8080/api/user/getCurrentUser`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response)
    return await response.json();
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn(state, action) {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
        },
        signUp(state) {
            state.currentUser = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers(builder) {
        builder.addCase(getUserAsync.fulfilled, (state, action) => {
            console.log(action.payload)
            state.currentUser = action.payload;
            state.isAuthenticated = !!action.payload;
        });
    }

});


export default authSlice.reducer;



