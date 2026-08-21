import Student from "../models/user.model"
export const  viewStudent = async ("viewstudent",req,res) => {
try{

    const {studentClass,StudentRoll,Registration}=req.body;

    if(Registration){
        const student=await Student.findOne(Registration)
        if(!student) {

        }
        return res.status(200).json(student)
    }

}catch(error) {

}
}
