import axios from "axios"

//get contacts
export const getContacts=async()=>{
    const response=await axios.get("http://localhost:3000/api/contact/get")
    return response
}