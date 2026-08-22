import Exam from "../models/exam.model.js";

// Update existing exam routine
export const updateExam = async (req, res) => {
    try {
        const { class: className, examName, exams } = req.body;

        // Check required fields
        if (!className || !examName || !exams) {
            return res.status(400).json({
                message: "Class, exam name and exam schedule are required"
            });
        }

        // Find existing exam
        const exam = await Exam.findOne({
            class: Number(className),
            examName: examName
        });

        // If exam does not exist
        if (!exam) {
            return res.status(404).json({
                message: "Exam routine not found. Create the exam first."
            });
        }

        // Update the existing exam
        exam.exams = exams;

        await exam.save();

        res.status(200).json({
            message: "Exam routine updated successfully",
            exam: exam
        });

    } catch (error) {
        console.error("Update exam error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};