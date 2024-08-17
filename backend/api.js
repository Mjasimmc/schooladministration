import express from "express"
import adminRouter from "./routes/adminRoutes.js"
import userRouter from "./routes/userRoutes.js"
import schoolRoutes from "./routes/schoolRoutes.js"
import authenticateUser from "./middleware/autheticateUser.js"


const api = express()

api.use("/admin", adminRouter)
api.use("/user", userRouter)
api.use("/school", authenticateUser, schoolRoutes)
export default api