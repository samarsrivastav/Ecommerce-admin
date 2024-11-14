import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const deleteProduct=async(req:any,res:any)=>{
    try {
        console.log(req.params.id)
        const find=await prisma.products.findFirst({
            where:{
                id:Number(req.params.id)
            }
        })
        if(!find){
            res.json({
                status:403,
                message:"Product Doesn't exist"
            })
        }
        const del=await prisma.products.delete({
            where:{
                id:Number(req.params.id)
            }
        })
        res.json({
            message:"Product deleted",
            status:200
        })
    } catch  {
        res.json({
            message:"error while deleting",
            status:403
        })
    }
}
export default deleteProduct