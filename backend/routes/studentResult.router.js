import express from "express";
import { addStudentResult } from "../controller/result.js";

const studentResultRouter = express.Router();

studentResultRouter.post(
    "/add",
    addStudentResult
);

export default studentResultRouter;
