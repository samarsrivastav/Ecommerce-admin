import express from 'express'
import cookieParser from "cookie-parser";
import cors from "cors";
import api from './routes/api'
const app=express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api',api)
app.listen(3000,()=>{
    console.log("app listening to port 3000")
})