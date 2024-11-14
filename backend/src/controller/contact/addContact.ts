import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

const addContact=async (req:any,res:any)=>{
    try {
        console.log(req.body)
        const contact=await prisma.contact.create({
            data:{
                mail:req.body.mail,
                query:req.body.problem,
                name:req.body.name
            }
        })
        res.json({
            status:200,
            contacts:contact
        })
    } catch(error) {
        console.log(error)
        res.json({
            staus:403,
            message:"Error while adding contacts"
        })
    }
}
export default addContact