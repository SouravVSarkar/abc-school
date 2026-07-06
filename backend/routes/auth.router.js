import express from "express"
import { registration } from "../controller/registration.js"

const authRouter = express.Router()

authRouter.post("/registration",registration)
export default authRouter