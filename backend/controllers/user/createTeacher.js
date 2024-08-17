import bcrypt from 'bcrypt';
import User from '../../models/User.js';
import httpStatus from '../../config/httpStatus.js'; // Adjust path as needed

/**
 * Validates the format of an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, false otherwise.
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return emailRegex.test(email.trim());
};

/**
 * Handles the bulk creation of teachers.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
const createTeacher = async (req, res) => {
  const teachers = req.body;
  const school = req.user.school
  if (!Array.isArray(teachers) || teachers.length === 0) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid input data.' });
  }

  const results = [];

  for (const teacherData of teachers) {
    const { email, password, name } = teacherData;

    // Validate email format
    if (!isValidEmail(email)) {
      results.push({ email, success: false, message: 'Invalid email format.' });
      continue;
    }

    // Check if the email is already in use
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
      results.push({ email, success: false, message: 'Email is already in use.' });
      continue;
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new teacher user
    const teacher = new User({
      email,
      password: hashedPassword,
      name,
      role: 'teacher',
      school
    });

    try {
      // Save the teacher to the database
      await teacher.save();
      results.push({
        email,
        success: true,
        message: 'Teacher created successfully.',
        teacher: {
          id: teacher._id,
          email: teacher.email,
          name: teacher.name,
          role: teacher.role,
        },
      });
    } catch (error) {
      console.error('Error creating teacher:', error.message);
      results.push({ email, success: false, message: 'Failed to create teacher.' });
    }
  }

  res.status(httpStatus.OK).json(results);
};

export default createTeacher;
