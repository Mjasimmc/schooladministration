import httpStatus from "../../config/httpStatus.js"
import User from "../../models/User.js"




const getListSchoolUsers = async (req, res, next) => {
    try {
        const school = req.user.school
        const userList = await User.find({ school })
        res.status(httpStatus.OK).json({
            list: userList,
            message: "fetched sucessfully"
        })
    } catch (error) {
        next(error)
    }
}

export default getListSchoolUsers