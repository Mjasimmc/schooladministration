import School from '../../models/School.js';

const updateSchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { schoolName, schoolAddress, data } = req.body;

    // Input validation
    if (!schoolName || !schoolAddress || !data) {
      throw new Error('School name, address, and data are required');
    }

    if (!Array.isArray(data)) {
      throw new Error('Data must be an array');
    }

    data.forEach(yearData => {
      if (!yearData.year || !Array.isArray(yearData.classes)) {
        throw new Error('Each year must have a year and an array of classes');
      }

      yearData.classes.forEach(classData => {
        if (!classData.className || !Array.isArray(classData.divisions)) {
          throw new Error('Each class must have a className and an array of divisions');
        }

        classData.divisions.forEach(divisionData => {
          if (!divisionData.division || typeof divisionData.studentCount !== 'number') {
            throw new Error('Each division must have a division name and a student count');
          }
        });
      });
    });

    // Find the school by ID and update it
    const updatedSchool = await School.findByIdAndUpdate(
      schoolId,
      {
        name: schoolName,
        address: schoolAddress,
        data: data
      },
      { new: true, runValidators: true } // return the updated document and run schema validators
    );

    if (!updatedSchool) {
      return res.status(404).json({ message: 'School not found' });
    }

    res.status(200).json({
      message: 'School updated successfully',
      school: updatedSchool
    });
  } catch (error) {
    console.error('Error updating school:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
};

export default updateSchool;
