import express from "express"
import { viewStudent } from "../controller/view.student.js"

const authRouter = express.Router()

authRouter.post("/view-student",viewStudent)
