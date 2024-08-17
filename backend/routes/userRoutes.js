import express from "express";

import registerSchool from "../controllers/user/registerSchool.js";
import logUser from "../controllers/user/logUser.js";
import logoutUser from "../controllers/user/logoutUser.js";
import validateUser from "../controllers/user/validateUser.js";



const router = express.Router()


router.post('/regsiter-school', registerSchool)
router.post('/log-user', logUser)

router.get('/logout-user', logoutUser)
router.get('/validate-user', validateUser)

export default router