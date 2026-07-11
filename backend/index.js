import dotenv from "dotenv"
import express from "express"
import { connectDb } from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.router.js"
import cors from "cors"


dotenv.config()
const PORT = process.env.PORT || 3000;
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json());
app.use("/api/auth",authRouter)




connectDb();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});