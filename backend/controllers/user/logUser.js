import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import httpStatus from '../../config/httpStatus.js'; // Adjust path as needed

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const isString = typeof email === 'string';
  const isNotEmpty = isString && email.trim() !== '';
  const isValidFormat = isNotEmpty && emailRegex.test(email.trim());
  return isValidFormat;
};

const logUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid email format' });
    }

    // Check if the user exists and populate the school information
    const user = await User.findOne({ email }).populate('school');
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token that expires in 7 days
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set the token in a different HTTP-only cookie (e.g., 'userAuthToken')
    res.cookie('userAuthToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });

    res.status(httpStatus.OK).json({ 
      message: 'Login successful', 
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name:user.name,
        school: user.school // Include school data in the response
      }
    });

  } catch (error) {
    console.error('Server Error:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export default logUser;
