import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import httpStatus from '../../config/httpStatus.js'; // Adjust path as needed

const validateUser = async (req, res) => {
    const token = req.cookies.userAuthToken;

    if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the token is close to expiring
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const timeRemaining = decoded.exp - currentTime;

        if (timeRemaining < 300) { // 5 minutes
            // Token is about to expire, refresh it
            const newToken = jwt.sign(
                { userId: decoded.userId, role: decoded.role }, 
                process.env.JWT_SECRET, 
                { expiresIn: '7d' } // The same expiration time as in your login function
            );

            // Set the new token in a cookie
            res.cookie('userAuthToken', newToken, { 
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
            });
        }

        // Retrieve the user data and populate the school information
        const user = await User.findById(decoded.userId).populate('school');
        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'User not found' });
        }

        res.status(httpStatus.OK).json({ 
            message: 'User is validated', 
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name:user.name,
                school: user.school // Include school data in the response
            }
        });

    } catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
};

export default validateUser;
