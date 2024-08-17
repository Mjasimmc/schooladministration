import jwt from 'jsonwebtoken';
import httpStatus from '../../config/httpStatus.js'; // Adjust path as needed

const validateAdmin = async (req, res) => {
    const token = req.cookies.authToken;

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
            const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Set the new token in a cookie
            res.cookie('authToken', newToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }); // 1 hour
        }

        res.status(httpStatus.OK).json({ message: 'User is validated', user: decoded });
    } catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
};

export default validateAdmin;
