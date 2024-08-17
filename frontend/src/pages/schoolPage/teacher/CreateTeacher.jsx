import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTeachers, schoolSelector } from '../../../app/slices/schoolSlice'; // Adjust import path

const CreateTeacher = () => {
    const dispatch = useDispatch();
    const { bulkCreateResults, isLoading, error } = useSelector(schoolSelector);

    const [formData, setFormData] = useState([{ name: '', email: '', password: '' }]);
    const [errors, setErrors] = useState([{ name: '', email: '', password: '' }]);
    const [submittedTeacherIds, setSubmittedTeacherIds] = useState(new Set());

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFormData = [...formData];
        updatedFormData[index][name] = value;
        setFormData(updatedFormData);

        // Reset error for the field being updated
        const updatedErrors = [...errors];
        updatedErrors[index] = { ...updatedErrors[index], [name]: '' };
        setErrors(updatedErrors);
    };

    const handleAddField = () => {
        setFormData([...formData, { name: '', email: '', password: '' }]);
        setErrors([...errors, { name: '', email: '', password: '' }]);
    };

    const handleRemoveField = (index) => {
        setFormData(formData.filter((_, i) => i !== index));
        setErrors(errors.filter((_, i) => i !== index));
    };

    const validateFormData = () => {
        let isValid = true;
        const validationErrors = formData.map(() => ({
            name: '',
            email: '',
            password: '',
        }));

        formData.forEach((data, index) => {
            if (!data.name.trim()) {
                isValid = false;
                validationErrors[index].name = 'Name is required';
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if (!data.email.trim()) {
                isValid = false;
                validationErrors[index].email = 'Email is required';
            } else if (!emailRegex.test(data.email)) {
                isValid = false;
                validationErrors[index].email = 'Invalid email format';
            }

            if (data.password.length < 6) {
                isValid = false;
                validationErrors[index].password = 'Password must be at least 6 characters long';
            }
        });

        setErrors(validationErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateFormData()) {
            const actionResult = await dispatch(createTeachers(formData));
            if (actionResult.payload.success) {
                // Update submittedTeacherIds with IDs of successfully created teachers
                const successfulIds = actionResult.payload.results.filter(result => result.success).map(result => result.id);
                setSubmittedTeacherIds(new Set(successfulIds));
            }
        }
    };

    return (
        <form className="w-full min-h-full p-4 flex flex-col" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Create Teachers</h2>
            {isLoading && <p className="text-blue-500">Creating teachers...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {bulkCreateResults.length > 0 && (
                <ul className="list-disc pl-5 mb-4">
                    {bulkCreateResults.map((result, index) => (
                        <li key={index} className={result.success ? 'text-green-500' : 'text-red-500'}>
                            {result.email}: {result.message}
                        </li>
                    ))}
                </ul>
            )}
            <div className="grid lg:grid-cols-2 gap-8 flex-1 p-8">
                {formData.map((data, index) => (
                    <div key={index} className="mb-6 max-w-md">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`name-${index}`}>
                                #{index + 1} Name
                            </label>
                            <input
                                type="text"
                                id={`name-${index}`}
                                name="name"
                                value={data.name}
                                onChange={(event) => handleChange(index, event)}
                                disabled={submittedTeacherIds.has(index)}
                                className={`border ${errors[index]?.name ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-4 w-full`}
                            />
                            {errors[index]?.name && (
                                <p className="text-red-500 text-xs italic mt-1">{errors[index].name}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`email-${index}`}>
                                Email
                            </label>
                            <input
                                type="email"
                                id={`email-${index}`}
                                name="email"
                                value={data.email}
                                onChange={(event) => handleChange(index, event)}
                                disabled={submittedTeacherIds.has(index)}
                                className={`border ${errors[index]?.email ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-4 w-full`}
                            />
                            {errors[index]?.email && (
                                <p className="text-red-500 text-xs italic mt-1">{errors[index].email}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`password-${index}`}>
                                Password
                            </label>
                            <input
                                type="password"
                                id={`password-${index}`}
                                name="password"
                                value={data.password}
                                onChange={(event) => handleChange(index, event)}
                                disabled={submittedTeacherIds.has(index)}
                                className={`border ${errors[index]?.password ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-4 w-full`}
                            />
                            {errors[index]?.password && (
                                <p className="text-red-500 text-xs italic mt-1">{errors[index].password}</p>
                            )}
                        </div>
                        <div className="flex items-center mb-6">
                            <button
                                type="button"
                                onClick={() => handleRemoveField(index)}
                                disabled={submittedTeacherIds.has(index)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {!submittedTeacherIds.size && (
                <div className="flex flex-wrap justify-end gap-4">
                    <button
                        type="button"
                        onClick={handleAddField}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
                    >
                        Add Teacher
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-4"
                    >
                        Create List of Teachers
                    </button>
                </div>
            )}
        </form>
    );
};

export default CreateTeacher;
