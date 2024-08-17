import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { closeSchoolSidebar, sidebarSliceSelector } from '../../../app/slices/sideBarSlice';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()

    const { isSchoolSidebarOpen } = useSelector(sidebarSliceSelector)
    const options = [
        { name: 'Dashboard', path: '/school' },
        { name: 'Teachers', path: '/school/teacher' },
        { name: 'Classes', path: '/school/class' },
        { name: 'Students', path: '/school/student' },
        { name: 'Settings', path: '/school/settings' },
        { name: 'Exams', path: '/school/exams' },
    ];

    // const 
    return (
        <div className={`h-screen w-56 fixed left-0 top-0 z-40 pt-20 flex overflow-visible duration-500  ${isSchoolSidebarOpen ? "translate-x-0" : "max-lg:-translate-x-[99%]"} `} >


            <div className={`bg-teal-600 flex-1 max-h-full overflow-y-auto p-4 relative`}>
                <ul className="flex flex-col gap-2">
                    {options.map((option) => (
                        <li key={option.name}>
                            <button
                                onClick={() => {
                                    navigate(option.path)
                                    dispatch(closeSchoolSidebar())
                                }}
                                aria-label={`Navigate to ${option.name}`}
                                aria-current={location.pathname === option.path ? "page" : undefined}
                                className={`block w-full text-left p-2 rounded transition-colors duration-300 
                                ${location.pathname === option.path
                                        ? "bg-gray-700 text-gray-100"
                                        : "hover:bg-gray-700 hover:text-gray-100"
                                    }`}
                            >
                                {option.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
