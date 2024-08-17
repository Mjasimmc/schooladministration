import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminSliceSelector, validateAdmin } from '../../../app/slices/adminSlice';
import AdminLoginPage from './AdminLoginPage';
import LoadingFullPage from '../../loadingComp/LoadingFullPage';
import { useTheme, useMediaQuery } from '@mui/material';

const AdminContentBody = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isLgScreen = useMediaQuery(theme.breakpoints.up('lg')); // Check if screen size is large or above
    const { logged, validatedStatus } = useSelector(adminSliceSelector);

    useEffect(() => {
        dispatch(validateAdmin());
    }, [dispatch]);

    if (validatedStatus === 'loading') {
        return <LoadingFullPage />; // Show a loading indicator while validating
    }

    if (validatedStatus === 'failed' || !logged) {
        return <AdminLoginPage />; // Show login page if validation failed or not logged in
    }

    return (
        <>
            <Sidebar />
            <Header />
            <div className='pt-20 lg:ps-56 min-h-screen bg-[#B8D8D8]'  >
                <Outlet />
            </div>
        </>
    );
}

export default AdminContentBody;
