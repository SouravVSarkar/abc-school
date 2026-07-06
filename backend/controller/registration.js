import Student from "../models/user.model.js"

export const registration = async (req,res) => {

    try{
        const {studentName,mothersname,fathersname,gender,registration,dob,mobile,studentClass, rollNo,address } = req.body

        const student = Student.create(
            {
                studentName,
                mothersname,
                fathersname,
                dob,
                studentClass,
                rollNo,
                registration,
                gender,
                mobile,
                address


            }
            
        )

        return res.status(200).json(student)

    }catch(error) {

        console.log(error)
    }

}
