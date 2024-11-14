import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { loginFn } from "../data/authApis";

export function LoginComponent() {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
  return (
    <div className="flex justify-center w-full bg-gradient-to-r from-[#133E87] to-[#CBDCEB] text-white h-screen">
        <form className=" flex w-[30%] flex-col gap-4  my-auto p-4 h-[40%]">
        <div>
            <div className="mb-2 block text-white">
                <Label htmlFor="username" value="Your Username" className="text-white"/>
            </div>
            <TextInput id="username" type="text" placeholder="Admin Username" required onChange={(e)=>{
                setUsername(e.target.value)
            }}/>
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" className="text-white"/>
            </div>
            <TextInput id="password1" type="password" placeholder="password@123" required onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
        </div>
        <Button type="button" className="bg-black" onClick={async ()=>{
           const response = await loginFn(username,password)
            if (response && response.data.token) {
                window.location.reload()
                console.log('hit sucess')
            } else {
                console.error("Login failed: no token returned");
            }
        }}>Login</Button>
        </form>
    </div>
  );
}
