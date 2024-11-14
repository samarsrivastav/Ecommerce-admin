const logout=async (req:any,res:any)=>{
    res.cookie("token"," ")
    res.json({
        message:"succesfully logged out!"
    })
}
export default logout