import { PrismaClient } from "@prisma/client";

const prisma =new PrismaClient()

const getProduct=async(req:any,res:any)=>{
    try{
        const result=await prisma.products.findMany()
        res.json({
            status:200,
            result
        })
    }catch{
        res.json({
            status:403,
            message:"error while getting"
        })
    }
}
export default getProduct