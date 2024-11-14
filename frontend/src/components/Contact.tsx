import { ContactCard } from "./subComp/ContactCard"
import { useEffect, useState } from "react";
import { getContacts } from "../data/contactApis";
import { Loading } from "./Loading";
export const Contact = () => {
    const [contacts,setContacts]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await getContacts()
            if(response.status==200){
                setContacts(response.data.contacts)
            }
        }
        fetchData()
    },[])
    if(contacts==undefined){
        return(
            <Loading/>
        )
    }
  return (
    <div className="w-[80%] ml-[20rem] h-screen ">
        <div className="flex my-5 justify-around">
        <div className="font-semibold text-5xl text-center font-sans my-5 text-[#133E87]">Contacts</div>
        </div>
        <div className="grid grid-cols-3 w-[90%] mx-auto my-5">
            {
                contacts.map(item=>{
                    //@ts-ignore
                    return <ContactCard item={item} key={item.id}/>
                })
            }
            
        </div>
    </div>
  )
}
