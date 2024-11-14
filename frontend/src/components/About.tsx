import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import AboutTables from "./subComp/AboutTable";
import { getAbout } from "../data/aboutApis";
import { AboutModalComponent } from "./subComp/AboutModal";
interface aboutProp{
    id?:string,
    phone?:string,
    email?:string,
    logo?:string,
    companyName?:string,
    companyAdress?:string
}
export function About() {
    const [openModal, setOpenModal] = useState(false);
    const [about,setAbout]=useState<aboutProp>({})
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await getAbout();
            if(response.status==200){
                setAbout(response.data.result)
            }
        }
        fetchData()
    },[openModal])
    
  return (
    <div className=" h-screen ml-[20rem] w-full text-center">
        <AboutModalComponent openModal={openModal} setOpenModal={setOpenModal}/>
        <div className="flex my-5 justify-around">
            <div className="font-semibold text-5xl text-center font-sans my-5 text-[#133E87]">About</div>
            <img src={about.logo} alt="" className="h-20 rounded-[100%] border-2 border-black"/>
        </div>
        <div className=" h-auto my-[5rem] w-[70%] mx-auto">
            <AboutTables about={about}/>
        </div>
        
        <div className="flex justify-center">
            <Button className="bg-[#133E87] text-white p-2 h-min mx-auto " onClick={() =>setOpenModal(true)}>
                Update Profile
            </Button>
        </div>
    </div>
  );
}
