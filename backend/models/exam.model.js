import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
    {
        class: {
            type: Number,
            required: true
        },

        examName: {
            type: String,
            required: true
        },

        exams: [
            {
                subject: {
                    type: String,
                    required: true
                },

                examDate: {
                    type: Date,
                    required: true
                },

                time: {
                    type: String,
                    required: true
                },

                duration: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: false
    }
);

const Exam = mongoose.model("Exam", examSchema);

export default Exam;