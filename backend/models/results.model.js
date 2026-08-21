import mongoose from "mongoose";

 const subjectSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true
        },

        marks: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        }
    },
    {
        _id: false
    }
);


const studentResultSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        className: {
            type: String,
            required: true
        },

        roll: {
            type: Number,
            required: true
        },

        registration: {
            type: String,
            required: true,
            unique: true
        },

        examYear: {
            type: Number,
            required: true
        },

        subjects: {
            type: [subjectSchema],
            required: true
        }
    },

    {
        timestamps: true
    }
);


const StudentResult = mongoose.model(
    "StudentResult",
    studentResultSchema
);

export default StudentResult