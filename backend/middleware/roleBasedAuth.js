import jwt from 'jsonwebtoken';

const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.authToken || req.headers['authorization']?.split(' ')[1]; // Get token from cookies or Authorization header

      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }

        if (decoded.role !== requiredRole) {
          return res.status(403).json({ message: 'Insufficient role' });
        }

        req.user = decoded; // Attach user info to the request
        next();
      });
    } catch (error) {
      console.error('Error in role middleware:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

export default roleMiddleware;
