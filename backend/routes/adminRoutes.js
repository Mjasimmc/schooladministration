import express from "express";
import logAdmin from "../controllers/admin/logAdmin.js";
import logoutAdmin from "../controllers/admin/logoutAdmin.js";
import validateAdmin from "../controllers/admin/validateAdmin.js";



const router = express.Router()

router.put('/logout-admin', logoutAdmin)
router.post('/log-admin', logAdmin)
router.get('/validate-admin', validateAdmin)

export default router