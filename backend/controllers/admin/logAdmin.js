import Admin from "../../models/Admin.js";
import httpStatus from "../../config/httpStatus.js"; // Adjust path as needed
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const isString = typeof email === 'string';
    const isNotEmpty = isString && email.trim() !== '';
    const isValidFormat = isNotEmpty && emailRegex.test(email.trim());
    return isValidFormat;
};

const logAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!isValidEmail(email)) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid email format' });
        }

        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set the token in a cookie
        res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days

        res.status(httpStatus.OK).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export default logAdmin;
