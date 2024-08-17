import express from "express";
import getListSchoolUsers from "../controllers/user/getListSchoolUsers.js";
import createTeacher from "../controllers/user/createTeacher.js";

const router = express.Router()

router.get('/list-teachers', getListSchoolUsers)
router.post('/create-teacher', createTeacher)

export default router