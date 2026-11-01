import StudentResult from "../models/results.model.js";


// Add student result
export const addStudentResult = async (req, res) => {

    try {

        const {
            name,
            className,
            roll,
            registration,
            examYear,
            subjects
        } = req.body;


        // Check required fields
        if (
            !name ||
            !className ||
            roll === undefined ||
            roll === null ||
            !registration ||
            examYear === undefined ||
            examYear === null ||
            !subjects ||
            subjects.length === 0
        ) {

            return res.status(400).json({
                message: "Please provide all student and subject details"
            });

        }


        // Check whether same student result already exists
        const existingResult = await StudentResult.findOne({
            registration: registration,
            examYear: examYear
        });


        if (existingResult) {

            return res.status(409).json({
                message: "Result already exists for this student and exam year"
            });

        }


        // Validate marks and keep only subject, marks and outOf
        // (grade is calculated on the frontend, not stored)
        const updatedSubjects = [];

        for (const item of subjects) {

            const marks = Number(item.marks);
            const outOf = Number(item.outOf);

            if (
                isNaN(marks) ||
                isNaN(outOf) ||
                outOf <= 0 ||
                marks < 0 ||
                marks > outOf
            ) {
                return res.status(400).json({
                    message: `Invalid marks for subject: ${item.subject}`
                });
            }

            updatedSubjects.push({
                subject: item.subject,
                marks: marks,
                outOf: outOf
            });

        }


        // Create new result
        const studentResult = new StudentResult({

            name: name,

            className: className,

            roll: Number(roll),

            registration: registration,

            examYear: Number(examYear),

            subjects: updatedSubjects

        });


        // Save to MongoDB
        const savedResult = await studentResult.save();


        // Send response to frontend
        res.status(201).json({

            message: "Student result saved successfully",

            result: savedResult

        });

    }

    catch (error) {

        console.error("Error saving student result:", error);

        res.status(500).json({

            message: "Failed to save student result",

            error: error.message

        });

    }

};
