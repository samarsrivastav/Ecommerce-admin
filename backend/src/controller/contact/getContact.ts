import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

const getContact=async (req:any,res:any)=>{
    try {
        const contact=await prisma.contact.findMany()
        res.json({
            status:200,
            contacts:contact
        })
    } catch {
        res.json({
            staus:403,
            message:"Error while getting contacts"
        })
    }
}
export default getContact