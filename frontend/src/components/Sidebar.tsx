// @ts-nocheck
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";

import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../data/authApis";
import { useEffect, useState } from "react";
import { getAbout } from "../data/aboutApis";
export function SidebarComponent() {
    const [about,setAbout]=useState<aboutProp>({})
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await getAbout();
            if(response.status==200){
                setAbout(response.data.result)
            }
            if(!response.data.result){
                setAbout({
                    companyName:"N/A"
                })
            }
        }
        fetchData()
    },[])
    const navigate=useNavigate()
    return (
        <Card className="h-screen fixed w-full bg-[#133E87] max-w-[20rem] p-4 space-y-10 shadow-xl shadow-blue-gray-900/5 rounded-none">
            <div className="mb-2 p-4 flex justify-left align-bottom">
                <Typography variant="h5" color="white" className="mr-5 h-min my-auto">
                    {about.companyName}
                </Typography>
                <img src={about.logo} alt="" className="h-12 rounded-[100%]"/>
            </div>
            <List className="text-white">
                <Link to='/'>
                    <ListItem>
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </Link>
                <Link to='/products'>
                    <ListItem>
                        <ListItemPrefix>
                            <ShoppingBagIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Products
                    </ListItem>
                </Link>
                <Link to='/contact'>
                    <ListItem>
                        <ListItemPrefix>
                            <InboxIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Contact
                    </ListItem>
                </Link>
                <Link to='/about'>
                    <ListItem>
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        About
                    </ListItem>
                </Link>
                <ListItem onClick={async ()=>{
                    const response=await logout()
                    if(response.status==200){
                        window.location.reload()
                    }else{
                        console.log('error')
                    }
                }}>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}
