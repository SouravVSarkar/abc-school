import express from "express";
import { updateExam } from "../controller/exam_admit.js";

const examRoutes = express.Router();

examRoutes.put("/update", updateExam);

export default examRoutes;