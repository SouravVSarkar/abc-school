import StudentResult from "../models/results.model.js";


// Add student result
export const addStudentResult = async (req, res) => {

    try {

        // Get data sent from frontend
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
            !roll ||
            !registration ||
            !examYear ||
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


        // Create new result
        const studentResult = new StudentResult({

            name: name,

            className: className,

            roll: roll,

            registration: registration,

            examYear: examYear,

            subjects: subjects

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

