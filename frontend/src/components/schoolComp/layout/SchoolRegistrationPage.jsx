import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUserWithSchool } from '../../../app/slices/userSlice';

const SchoolRegistrationPage = ({ setLogin }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        schoolName: '',
        schoolAddress: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(registerUserWithSchool(formData));
    };

    return (
        <div className="flex flex-col justify-center px-4 py-12 lg:px-8 bg-gradient-to-tl from-blue-300 to-gray-200 min-h-screen pb-20">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register With A School
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <form className="space-y-6 shadow-xl p-4 rounded-lg" onSubmit={submit} method="POST">
                    {/* Name Input */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Your Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="outline-none px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* School Name Input */}
                    <div>
                        <label
                            htmlFor="schoolName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            School Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="schoolName"
                                name="schoolName"
                                type="text"
                                required
                                value={formData.schoolName}
                                onChange={handleChange}
                                className="outline-none px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* School Address Input */}
                    <div>
                        <label
                            htmlFor="schoolAddress"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            School Address
                        </label>
                        <div className="mt-2">
                            <input
                                id="schoolAddress"
                                name="schoolAddress"
                                type="text"
                                required
                                value={formData.schoolAddress}
                                onChange={handleChange}
                                className="outline-none px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="outline-none px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="outline-none px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Register
                        </button>
                    </div>
                    <div className="text-center">
                        <p className='cursor-pointer text-blue-500'
                            onClick={() => setLogin('login')}
                        >log into my account</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SchoolRegistrationPage;
