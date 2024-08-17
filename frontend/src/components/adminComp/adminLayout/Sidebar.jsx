import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const options = [
        { name: 'Dashboard', path: '/admin' },
        { name: 'Users', path: '/admin/users' },
        { name: 'Roles', path: '/admin/roles' },
        { name: 'Permissions', path: '/admin/permissions' },
        { name: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className='h-screen w-56 fixed left-0 top-0 z-10 pt-20 flex'>
            <div className="bg-teal-600 flex-1 max-h-full overflow-y-auto p-4">
                <ul className="space-y-4">
                    {options.map((option) => (
                        <li key={option.name}>
                            <button
                                onClick={() => navigate(option.path)}
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
