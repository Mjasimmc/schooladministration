import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { IconButton } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarSliceSelector, toggleSchoolSidebar } from '../../../app/slices/sideBarSlice';
import Close from '@mui/icons-material/Close';

const Header = () => {
    const dispatch = useDispatch()
    const { isSchoolSidebarOpen } = useSelector(sidebarSliceSelector)
    const toggleSidebarMenu = ()=> dispatch(toggleSchoolSidebar())
    return (
        <div className="w-screen h-20 bg-teal-600 fixed left-0 top-0   z-50  flex items-center justify-between px-6 ">
            <div className="text-white text-2xl font-bold flex gap-4">

                <div className='lg:hidden'>
                    <IconButton  onClick={toggleSidebarMenu}>
                       {!isSchoolSidebarOpen?  <Menu />  :<Close />}
                    </IconButton>
                </div>
                <Link to="/">YourLogo</Link>
            </div>

            <div className="flex items-center space-x-3">
               

                <button className="text-white p-1 grid place-content-center rounded-full bg-teal-700 hover:bg-teal-800 relative">
                    <NotificationsNoneIcon sx={{ fontSize: '1.9rem' }} />
                    <span className="absolute -top-1 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        3
                    </span>
                </button>

                <div className="relative">
                    <button className="text-white p-1 rounded-full bg-teal-700 hover:bg-teal-800 grid place-content-center">
                        <ProfileIcon sx={{ fontSize: '1.9rem' }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
