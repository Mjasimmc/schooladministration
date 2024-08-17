import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import httpStatus from '../config/httpStatus.js'; // Adjust path as needed

const authenticateUser = async (req, res, next) => {
    try {
        // Extract the token from the 'userAuthToken' cookie
        const token = req.cookies.userAuthToken;

        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Authentication token missing' });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user associated with the token
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'User not found' });
        }

        // Attach the user to the request object
        req.user = {
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            school: user.school // Include school data
        };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Authentication Error:', error.message);
        res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
    }
};

export default authenticateUser;
