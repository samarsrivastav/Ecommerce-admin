import { PrismaClient } from "@prisma/client"
import jwt from 'jsonwebtoken'

const JWT_SECRET=process.env.JWT_SECRET || " "

const prisma=new PrismaClient()
const login=async (req:any,res:any)=>{
    const username=req.body.username
    const password=req.body.password
    try {
        const user=await prisma.auth.findFirst({
            where:{
                username:username,
                password:password
            }
        })
        if(!user){
            return res.json({
                status:403,
                message:"Login Failed!!"
            })
        }
        const token=jwt.sign({
            username,
            id:1
        },JWT_SECRET)
        res.cookie("token",token)
        res.json({
            token:token,
            status:200,
            message:"Logged in succesfully"
        })
    } catch (error) {
        console.log(error)
        res.json({
            status:403,
            message:"Login Failed!!"
        })
    }
}
export default login