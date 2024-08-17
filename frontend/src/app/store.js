import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './slices/adminSlice';
import userReducer from './slices/userSlice';
import sideBarReducer from './slices/sideBarSlice';
import schoolReducer from './slices/schoolSlice';

const store = configureStore({
    reducer: {
        admin: adminReducer,
        user: userReducer,
        sidebar:sideBarReducer,
        school:schoolReducer
    },
});

export default store;
