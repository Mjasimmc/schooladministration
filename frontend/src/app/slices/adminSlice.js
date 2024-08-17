import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    adminLoginService,
    adminlogoutService,
    validateAdminService
} from '../adminServices'; // Ensure to import your services

const initialState = {
    logged: false,
    validatedStatus: 'idle', // Track validation status
    status: 'idle',
    error: null,
};

// Create an async thunk for admin login
export const adminLogin = createAsyncThunk(
    'admin/adminLogin',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await adminLoginService(formData);
            localStorage.setItem('token', response.token);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create an async thunk for admin logout
export const adminLogout = createAsyncThunk(
    'admin/adminLogout',
    async (_, { rejectWithValue }) => {
        try {
            await adminlogoutService(); // Handle the API call for logout
            localStorage.removeItem('token'); // Remove token from local storage
            return; // Return nothing on successful logout
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create an async thunk for validating admin
export const validateAdmin = createAsyncThunk(
    'admin/validateAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const response = await validateAdminService();
            return response; // Handle response if needed
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state) => {
                state.logged = true;
                state.status = 'succeeded';
                state.validatedStatus = 'succeeded'; // Set validatedStatus to succeeded on successful login
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(adminLogout.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(adminLogout.fulfilled, (state) => {
                state.logged = false;
                state.status = 'succeeded';
                state.validatedStatus = 'idle'; // Optionally reset validatedStatus on logout
            })
            .addCase(adminLogout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(validateAdmin.pending, (state) => {
                state.validatedStatus = 'loading'; // Set validatedStatus to loading while validating
                state.error = null;
            })
            .addCase(validateAdmin.fulfilled, (state) => {
                state.logged = true; // Assumes that if the validation is successful, the user is logged in
                state.validatedStatus = 'succeeded'; // Set validatedStatus to succeeded on successful validation
            })
            .addCase(validateAdmin.rejected, (state, action) => {
                state.logged = false; // If validation fails, the user is considered not logged in
                state.validatedStatus = 'failed'; // Set validatedStatus to failed on validation failure
                state.error = action.payload;
            });
    },
});

export const adminSliceSelector = (state) => state.admin;
export default adminSlice.reducer;
