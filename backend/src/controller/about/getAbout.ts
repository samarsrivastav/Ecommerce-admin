import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()
const getAbout=async(req:any,res:any)=>{
    try {
        const result=await prisma.about.findFirst()
        res.json({
            status:200,
            result
        })
    } catch {
        res.json({
            status:403,
            message:"error while getting about section"
        })
    }
}
export default getAbout