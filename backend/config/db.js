import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
export const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://ss5783409_db_user:0airza8W6cLxMkma@cluster0.4xdfg5u.mongodb.net/")
    }catch(error) {
        console.log(error)

    }
    
}