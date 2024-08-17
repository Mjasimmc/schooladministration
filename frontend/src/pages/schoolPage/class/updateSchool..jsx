import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSchool, fetchSchoolById, schoolSelector } from '../../../app/slices/schoolSlice';

const UpdateSchoolPage = ({ schoolId }) => {
    const dispatch = useDispatch();
    const { school, isLoading, error } = useSelector(schoolSelector);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        data: [
            {
                year: '',
                classes: [
                    {
                        className: '',
                        divisions: [
                            {
                                division: '',
                                studentCount: 0
                            }
                        ]
                    }
                ]
            }
        ]
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        // dispatch(fetchSchoolById(schoolId));
    }, [dispatch, schoolId]);

    useEffect(() => {
        if (school) {
            setFormData({
                name: school.name || '',
                address: school.address || '',
                data: school.data || [{
                    year: '',
                    classes: [{
                        className: '',
                        divisions: [{ division: '', studentCount: 0 }]
                    }]
                }]
            });
        }
    }, [school]);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const handleYearChange = (yearIndex, field, value) => {
        const updatedData = [...formData.data];
        updatedData[yearIndex][field] = value;
        setFormData({ ...formData, data: updatedData });
        clearNestedError(yearIndex, field);
    };

    const handleClassChange = (yearIndex, classIndex, field, value) => {
        const updatedClasses = [...formData.data[yearIndex].classes];
        updatedClasses[classIndex][field] = value;
        const updatedData = [...formData.data];
        updatedData[yearIndex].classes = updatedClasses;
        setFormData({ ...formData, data: updatedData });
        clearNestedError(yearIndex, `classes.${classIndex}.${field}`);
    };

    const handleDivisionChange = (yearIndex, classIndex, divisionIndex, field, value) => {
        const updatedDivisions = [...formData.data[yearIndex].classes[classIndex].divisions];
        updatedDivisions[divisionIndex][field] = value;
        const updatedClasses = [...formData.data[yearIndex].classes];
        updatedClasses[classIndex].divisions = updatedDivisions;
        const updatedData = [...formData.data];
        updatedData[yearIndex].classes = updatedClasses;
        setFormData({ ...formData, data: updatedData });
        clearNestedError(yearIndex, `classes.${classIndex}.divisions.${divisionIndex}.${field}`);
    };

    const clearNestedError = (yearIndex, path) => {
        const updatedErrors = { ...errors };
        if (updatedErrors.data?.[yearIndex]) {
            delete updatedErrors.data[yearIndex][path];
            if (Object.keys(updatedErrors.data[yearIndex]).length === 0) {
                delete updatedErrors.data[yearIndex];
            }
        }
        setErrors(updatedErrors);
    };

    const validateFormData = () => {
        let isValid = true;
        const validationErrors = {};

        if (!formData.name.trim()) {
            isValid = false;
            validationErrors.name = 'School name is required';
        }

        formData.data.forEach((year, yearIndex) => {
            if (!year.year.trim()) {
                isValid = false;
                validationErrors.data = validationErrors.data || [];
                validationErrors.data[yearIndex] = validationErrors.data[yearIndex] || {};
                validationErrors.data[yearIndex].year = 'Year is required';
            }

            year.classes.forEach((cls, classIndex) => {
                if (!cls.className.trim()) {
                    isValid = false;
                    validationErrors.data[yearIndex] = validationErrors.data[yearIndex] || {};
                    validationErrors.data[yearIndex].classes = validationErrors.data[yearIndex].classes || [];
                    validationErrors.data[yearIndex].classes[classIndex] = validationErrors.data[yearIndex].classes[classIndex] || {};
                    validationErrors.data[yearIndex].classes[classIndex].className = 'Class name is required';
                }

                cls.divisions.forEach((division, divisionIndex) => {
                    if (!division.division.trim()) {
                        isValid = false;
                        validationErrors.data[yearIndex].classes[classIndex] = validationErrors.data[yearIndex].classes[classIndex] || {};
                        validationErrors.data[yearIndex].classes[classIndex].divisions = validationErrors.data[yearIndex].classes[classIndex].divisions || [];
                        validationErrors.data[yearIndex].classes[classIndex].divisions[divisionIndex] = validationErrors.data[yearIndex].classes[classIndex].divisions[divisionIndex] || {};
                        validationErrors.data[yearIndex].classes[classIndex].divisions[divisionIndex].division = 'Division name is required';
                    }

                    if (division.studentCount <= 0) {
                        isValid = false;
                        validationErrors.data[yearIndex].classes[classIndex].divisions[divisionIndex] = validationErrors.data[yearIndex].classes[classIndex].divisions[divisionIndex] || {};
                        validationErrors.data[yearIndex].classes[classIndex].divisions[divisionIndex].studentCount = 'Student count must be greater than zero';
                    }
                });
            });
        });

        setErrors(validationErrors);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateFormData()) {
            // dispatch(updateSchool({ schoolId, formData }));
        }
    };

    return (
        <form className="w-full min-h-full p-4 flex flex-col" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Update School</h2>
            {isLoading && <p className="text-blue-500">Updating school...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-6 max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        School Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-4 w-full`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className={`border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-4 w-full`}
                    />
                </div>
            </div>
            {formData.data.map((yearData, yearIndex) => (
                <div key={yearIndex} className="mb-6 max-w-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`year-${yearIndex}`}>
                            Year
                        </label>
                        <input
                            type="text"
                            id={`year-${yearIndex}`}
                            value={yearData.year}
                            onChange={(e) => handleYearChange(yearIndex, 'year', e.target.value)}
                            className={`border ${errors.data?.[yearIndex]?.year ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-4 w-full`}
                        />
                        {errors.data?.[yearIndex]?.year && (
                            <p className="text-red-500 text-xs italic mt-1">{errors.data[yearIndex].year}</p>
                        )}
                    </div>
                    {yearData.classes.map((classData, classIndex) => (
                        <div key={classIndex} className="mb-6 max-w-md">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`className-${classIndex}`}>
                                    Class Name
                                </label>
                                <input
                                    type="text"
                                    id={`className-${classIndex}`}
                                    value={classData.className}
                                    onChange={(e) => handleClassChange(yearIndex, classIndex, 'className', e.target.value)}
                                    className={`border ${errors.data?.[yearIndex]?.classes?.[classIndex]?.className ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-4 w-full`}
                                />
                                {errors.data?.[yearIndex]?.classes?.[classIndex]?.className && (
                                    <p className="text-red-500 text-xs italic mt-1">{errors.data[yearIndex].classes[classIndex].className}</p>
                                )}
                            </div>
                            {classData.divisions.map((divisionData, divisionIndex) => (
                                <div key={divisionIndex} className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`division-${divisionIndex}`}>
                                        Division
                                    </label>
                                    <input
                                        type="text"
                                        id={`division-${divisionIndex}`}
                                        value={divisionData.division}
                                        onChange={(e) => handleDivisionChange(yearIndex, classIndex, divisionIndex, 'division', e.target.value)}
                                        className={`border ${errors.data?.[yearIndex]?.classes?.[classIndex]?.divisions?.[divisionIndex]?.division ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-4 w-full`}
                                    />
                                    {errors.data?.[yearIndex]?.classes?.[classIndex]?.divisions?.[divisionIndex]?.division && (
                                        <p className="text-red-500 text-xs italic mt-1">{errors.data[yearIndex].classes[classIndex].divisions[divisionIndex].division}</p>
                                    )}
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`studentCount-${divisionIndex}`}>
                                        Student Count
                                    </label>
                                    <input
                                        type="number"
                                        id={`studentCount-${divisionIndex}`}
                                        value={divisionData.studentCount}
                                        onChange={(e) => handleDivisionChange(yearIndex, classIndex, divisionIndex, 'studentCount', parseInt(e.target.value, 10))}
                                        className={`border ${errors.data?.[yearIndex]?.classes?.[classIndex]?.divisions?.[divisionIndex]?.studentCount ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 px-4 w-full`}
                                    />
                                    {errors.data?.[yearIndex]?.classes?.[classIndex]?.divisions?.[divisionIndex]?.studentCount && (
                                        <p className="text-red-500 text-xs italic mt-1">{errors.data[yearIndex].classes[classIndex].divisions[divisionIndex].studentCount}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
            <div className="mt-6 max-w-md">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isLoading}
                >
                    Update School
                </button>
            </div>
        </form>
    );
};

export default UpdateSchoolPage;
