//get

import axios from "axios"

export const getAbout=async ()=>{
    const response=await axios.get('http://localhost:3000/api/about/get')
    return response
}

//update
interface UpdateAboutData {
    companyName?: string;
    phone?: string;
    email?: string;
    file?: File;
    companyAdress?: string;
    companyTagline?:string
    companyDescription?:string
}

export const updateAbout = async (data: UpdateAboutData) => {
    const formData = new FormData();
    
    if (data.companyName) formData.append("companyName", data.companyName);
    if (data.phone) formData.append("phone", data.phone);
    if (data.email) formData.append("email", data.email);
    if (data.companyAdress) formData.append("companyAdress", data.companyAdress);
    if (data.companyTagline) formData.append("companyTagline", data.companyTagline);
    if (data.companyDescription) formData.append("companyDescription", data.companyDescription);
    if (data.file) formData.append("file", data.file);

    const response = await axios.put('http://localhost:3000/api/about/update', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response;
};