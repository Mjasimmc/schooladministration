import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminLogout } from '../../../app/slices/adminSlice';

const Header = () => {
    const dispatch = useDispatch()
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    const logoutUser = () => {
        dispatch(adminLogout());
    };

    return (
        <header className='bg-teal-600 text-white h-[5rem] fixed w-screen flex items-center px-4 shadow-md'>
            <div className='flex items-center space-x-4'>
                {/* Logo/Brand */}
                <Link to='/admin' className='text-xl font-bold'>
                    Admin Dashboard
                </Link>
            </div>
            <div className='ml-auto flex items-center space-x-4'>
                {/* User Profile or Admin Name */}
                <div className='relative'>
                    <button
                        onClick={toggleDropdown}
                        className='flex items-center space-x-2 bg-teal-800 px-4 py-2 rounded'
                    >
                        <span>Admin Name</span>
                        <svg
                            className={`w-5 h-5 transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                        </svg>
                    </button>
                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className='absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded'>
                            <Link to='/admin/profile' className='block px-4 py-2 hover:bg-gray-100'>
                                Profile
                            </Link>
                            <button
                                onClick={logoutUser}
                                className='w-full text-left px-4 py-2 hover:bg-gray-100'
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
