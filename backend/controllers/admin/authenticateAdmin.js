import jwt from 'jsonwebtoken';
import httpStatus from '../../config/httpStatus.js';

const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;
  
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(httpStatus.FORBIDDEN).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
