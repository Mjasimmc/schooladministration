import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    schoolRegisterService,
    userLoginService,
    validateUser,
    userLogoutService
} from '../userServices';

// Define the async thunk for registering a user with a school
export const registerUserWithSchool = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await schoolRegisterService(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Define the async thunk for logging in a user
export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await userLoginService(credentials);
            console.log(response)
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Define the async thunk for validating a user
export const validateUserSession = createAsyncThunk(
    'user/validate',
    async (_, { rejectWithValue }) => {
        try {
            const response = await validateUser();
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Define the async thunk for logging out a user
export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userLogoutService();
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    loggedIn: false,
    validationStatus: 'idle',
    status: 'idle',
    error: null,
};

// Create a slice for user management
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUserWithSchool.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUserWithSchool.fulfilled, (state, action) => {
                state.loggedIn = true;
                state.status = 'succeeded';
                state.error = null;
                localStorage.setItem('token', action.payload.token); // Save token
            })
            .addCase(registerUserWithSchool.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loggedIn = true;
                state.status = 'succeeded';
                state.error = null;
                localStorage.setItem('token', action.payload.token); // Save token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(validateUserSession.pending, (state) => {
                state.validationStatus = 'loading';
                state.error = null;
            })
            .addCase(validateUserSession.fulfilled, (state) => {
                state.loggedIn = true;
                state.validationStatus = 'succeeded';
                state.error = null;
            })
            .addCase(validateUserSession.rejected, (state, action) => {
                state.loggedIn = false;
                state.validationStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loggedIn = false;
                state.status = 'succeeded';
                state.error = null;
                localStorage.removeItem('token'); // Remove token
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const userSliceSelector = (state) => state.user;
export default userSlice.reducer;
