import Exam from "../models/exam.model.js";


// CREATE EXAM SCHEDULE
export const createExam = async (req, res) => {
    try {
        const {
            class: className,
            examName,
            exams
        } = req.body;

        // Check required data
        if (!className || !examName || !exams) {
            return res.status(400).json({
                message: "Class, exam name and exam schedule are required"
            });
        }

        // Check whether this class already has a schedule
        const existingExam = await Exam.findOne({
            class: Number(className)
        });

        if (existingExam) {
            return res.status(409).json({
                message: "This class already has an exam schedule. Use update instead."
            });
        }

        // Create new schedule
        const exam = await Exam.create({
            class: Number(className),
            examName,
            exams
        });

        res.status(201).json({
            message: "Exam schedule created successfully",
            exam
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// UPDATE EXAM SCHEDULE
export const updateExam = async (req, res) => {
    try {
        const {
            class: className,
            examName,
            exams
        } = req.body;

        // Check required data
        if (!className || !examName || !exams) {
            return res.status(400).json({
                message: "Class, exam name and exam schedule are required"
            });
        }

        // Find schedule using CLASS ONLY
        const exam = await Exam.findOne({
            class: Number(className)
        });

        // If no schedule exists
        if (!exam) {
            return res.status(404).json({
                message: "No exam schedule exists for this class. Create it first."
            });
        }

        // Update existing schedule
        exam.examName = examName;
        exam.exams = exams;

        await exam.save();

        res.status(200).json({
            message: "Exam schedule updated successfully",
            exam
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};