import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },
    fathersname:{
        type:String,
        required:true
    },
    mothersname:{
        type:String,
        required:true
    },

    gender:{
        type:String,
        required:true

    },
    studentClass:{
        type:Number,
     required:true
    },
    rollNo:{
        type:Number,
        required:true
    },
    registration:{
        type:Number,
        required:true,
        unique:true
    },
    dob:{
        type:Date,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    
    address:{
        type:String
    }

},{timestamps:false})

const Student = mongoose.model('Student',studentSchema)
export default Student