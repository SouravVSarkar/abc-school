import express from "express";

import {
    updateExam,
    downloadExam
} from "../controller/exam_admit.js";

const examRoutes = express.Router();


// Create / Update
examRoutes.put("/update", updateExam);


// Download exam schedule
examRoutes.get("/download/:class", downloadExam);


export default examRoutes;