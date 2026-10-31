javascript
import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
    {

        subject: {
            type:String,
            required: true,
            trim: true
        },

        marks: {
            type: Number,
            required: true,
            min: 0
        },

        outOf: {
            type: Number,
            required: true,
            min: 1
        },

        grade: {
            type: String,
            required: true,
            enum: [
                "O+",
                "O",
                "A+",
                "A",
                "B+",
                "B",
                "C+",
                "C",
                "D"
            ]
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
            unique: true,
            trim: true
        },

        examYear: {
            type: Number,
            required: true
        },

        subjects: {
            type: [subjectSchema],
            required: true,
            validate: {
                validator: function (subjects) {
                    return subjects.length > 0;
                },
                message: "At least one subject is required"
            }
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

export default StudentResult;


