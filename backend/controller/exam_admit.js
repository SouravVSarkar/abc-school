import Exam from "../models/exam.model.js";


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

        const classNumber = Number(className);

        // Find schedule using class only
        const existingExam = await Exam.findOne({
            class: classNumber
        });

        // If schedule does NOT exist
        if (!existingExam) {

            const newExam = await Exam.create({
                class: classNumber,
                examName: examName,
                exams: exams
            });

            return res.status(201).json({
                message: "Exam schedule created successfully",
                exam: newExam
            });
        }

        // If schedule already exists → UPDATE
        existingExam.examName = examName;
        existingExam.exams = exams;

        await existingExam.save();

        return res.status(200).json({
            message: "Exam schedule updated successfully",
            exam: existingExam
        });

    } catch (error) {

        console.error("Exam update error:", error);

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};