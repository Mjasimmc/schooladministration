import httpStatus from "../../config/httpStatus.js";

const logoutAdmin = (req, res) => {
    try {
      // Clear the authentication cookie
      res.cookie('authToken', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', expires: new Date(0) });
      
      res.status(httpStatus.OK).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Server Error:', error.message);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  };
  
  export default logoutAdmin;
  