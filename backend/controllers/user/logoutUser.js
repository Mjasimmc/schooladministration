import httpStatus from '../../config/httpStatus.js'; // Adjust path as needed

const logoutUser = (req, res) => {
  try {
    // Clear the 'userAuthToken' cookie
    res.clearCookie('userAuthToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    res.status(httpStatus.OK).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Server Error:', error.message);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

export default logoutUser;
