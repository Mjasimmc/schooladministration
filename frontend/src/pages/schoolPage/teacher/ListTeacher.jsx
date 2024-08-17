import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getListSchoolTeachers, schoolSelector } from '../../../app/slices/schoolSlice';

const ListTeacher = () => {
    const dispatch = useDispatch();
    const { teachers } = useSelector(schoolSelector);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getListSchoolTeachers());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCreate = () => {
        navigate('create');
    };

    // Filter teachers based on search query
    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">List of Teachers</h1>
                <button
                    onClick={handleCreate}
                    className="px-5 py-2 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition duration-300"
                >
                    Create New Teacher
                </button>
            </div>

            <div className="mb-6 flex justify-end">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
                />
            </div>
          
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-teal-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">No</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeachers.length > 0 ? (
                            filteredTeachers.map((teacher, index) => (
                                <tr key={teacher._id} className="hover:bg-gray-100">
                                    <td className="py-3 px-4 border-b">{index + 1}</td>
                                    <td className="py-3 px-4 border-b truncate">
                                        <div className="relative pt-3">
                                            <p className="absolute top-0 left-0 bg-green-200 text-green-800 text-xs rounded-md px-1">
                                                {teacher.role}
                                            </p>
                                            <p className="truncate">{teacher.name}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 border-b truncate">{teacher.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-3 px-4 text-center text-gray-500">
                                    No teachers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListTeacher;
