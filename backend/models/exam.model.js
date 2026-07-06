import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
    class:{
        typeof:Number,
        require:true
    },
    examName:{
        type:String,
        required:true
    },
    exams:[
        {
            subject:{
                type:String,
                required:true
            },
            examDate:{
                type:Date,
                required:true
            },
            time:{
                type:time,
                required:true

            },
            duration:{
                type:Number,
                requifred:true
            }
        }
    ]
},{
    Timestamp:false
})