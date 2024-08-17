import React, { useState } from 'react';

const school = {
    name: 'School Name',
    address: '123 Main Street, Hometown, Country',
    data: [
        {
            year: '2024',
            classes: [
                {
                    className: 'Class A',
                    divisions: [
                        { division: 'A1', studentCount: 30 },
                        { division: 'A2', studentCount: 28 },
                    ],
                },
                {
                    className: 'Class B',
                    divisions: [
                        { division: 'B1', studentCount: 25 },
                        { division: 'B2', studentCount: 32 },
                    ],
                },
            ],
        },
        {
            year: '2023',
            classes: [
                {
                    className: 'Class C',
                    divisions: [
                        { division: 'C1', studentCount: 27 },
                        { division: 'C2', studentCount: 29 },
                    ],
                },
            ],
        },
    ],
};

const ClassDashboard = () => {
    const currentYear = new Date().getFullYear().toString(); // Get current year as a string
    const [selectedYear, setSelectedYear] = useState(currentYear); // Default to current year
    const [selectedClass, setSelectedClass] = useState('');

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        setSelectedClass(''); // Reset class filter when year changes
    };

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    const filteredData = school.data
        .filter((yearData) => !selectedYear || yearData.year === selectedYear)
        .map((yearData) => ({
            ...yearData,
            classes: yearData.classes.filter(
                (classData) => !selectedClass || classData.className === selectedClass
            ),
        }))
        .filter((yearData) => yearData.classes.length > 0);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-4xl font-extrabold mb-4 text-center text-indigo-700">{school.name}</h1>
                <p className="mb-8 text-center text-gray-500">{school.address}</p>

                <div className="flex justify-between mb-8">
                    <div>
                        <label className="block text-gray-600 font-medium mb-2">Filter by Year:</label>
                        <select
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                        >
                            <option value="">All Years</option>
                            {school.data.map((yearData, index) => (
                                <option key={index} value={yearData.year}>
                                    {yearData.year}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedYear && (
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Filter by Class:</label>
                            <select
                                value={selectedClass}
                                onChange={handleClassChange}
                                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
                            >
                                <option value="">All Classes</option>
                                {school.data
                                    .find((yearData) => yearData.year === selectedYear)
                                    .classes.map((classData, index) => (
                                        <option key={index} value={classData.className}>
                                            {classData.className}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="overflow-y-auto">
                    {filteredData.map((yearData, yearIndex) => (
                        <div key={yearIndex} className="mb-10">
                            <h2 className="text-3xl font-semibold mb-6 text-indigo-600">Year: {yearData.year}</h2>

                            <div className="grid grid-cols-1 gap-8">
                                {yearData.classes.map((classData, classIndex) => (
                                    <div key={classIndex} className="bg-gray-50 p-6 rounded-lg shadow-md">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-700">{classData.className}</h3>
                                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                            <thead className="bg-teal-600 text-white">
                                                <tr>
                                                    <th className="py-3 px-4 text-left">Division</th>
                                                    <th className="py-3 px-4 text-center">Student Count</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {classData.divisions.map((divisionData, divisionIndex) => (
                                                    <tr key={divisionIndex} className="hover:bg-gray-100">
                                                        <td className="py-3 px-4 border-b">{divisionData.division}</td>
                                                        <td className="py-3 px-4 border-b text-center">{divisionData.studentCount}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassDashboard;
