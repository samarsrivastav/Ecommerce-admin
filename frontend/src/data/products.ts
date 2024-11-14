import axios from "axios"

//get products
export const getProduct=async()=>{
    const response = await axios.get("http://localhost:3000/api/products/get")
    return response
}

//add products
export const addProduct=async(title:string,description:string,file:File)=>{
    const formData=new FormData()
    formData.append("title",title)
    formData.append("description",description)
    formData.append("file",file)
    const response = await axios.post("http://localhost:3000/api/products/create",formData,{
        headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        }
    })
    return response
}
//delete products
export const deleteProduct=async(id:number)=>{
    const response=await axios.delete(`http://localhost:3000/api/products/delete/${id}`)
    return response
}

//update products
export const updateProduct=async(id:number,title?:string,description?:string,file?:File)=>{
    const formData=new FormData()
    if(title)formData.append("title",title)
    if(description)formData.append("description",description)
    if(file)formData.append("file",file)
    const response=await axios.put(`http://localhost:3000/api/products/update/${id}`,formData,{
        headers: {
            'Content-Type': 'multipart/form-data', 
        }
    })
    return response
}