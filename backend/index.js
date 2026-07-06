import dotenv from "dotenv"
import express from "express"
import { connectDb } from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.router.js"
import cors from "cors"


dotenv.config()
const port=process.env.PORT
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use("/api/auth",authRouter)


app.listen(port,()=>{
    console.log("sarver sarted...")
    connectDb()
    
})
