import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import bg from '/public/bg.jpg'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
function LogIn() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const [error,setIsError ] = useState({
    email:'', 
    password:'',
  })
  const login =async () => {
    if(email === ''||password==='') {
      if(email===''){
      setIsError((prevError) => ({
        ...prevError,
        email: 'Email is required',
      }))}
      if(password===''){
        setIsError((prevError) => ({
          ...prevError,
          password: 'please enter your password',
        }))
      }
      return
    }
    
    try {

      await  signInWithEmailAndPassword(auth,email,password)
    } catch (error:any) {
      // Handle specific error cases
      if (error.code === 'auth/invalid-email') {
        setIsError((prevError) => ({
          ...prevError,
          email: 'Email is invalid',
        }));
      } else if(error.code === 'auth/invalid-credential')  {
        setIsError((prevError) => ({
          ...prevError,
          password: 'wrong password'
        }))
      }
  }
  }
  console.log(error)
  return (
    <div className="h-screen w-screen flex items-center justify-center">

    <div className="flex w-full h-full ">
      <div className=" w-1/3  h-full overflow-hidden relative  items-center justify-center border-r-[4px] border-primary border-solid hidden md:flex">
        <img src={bg} alt="bg" className="max-w-[unset]  absolute top-0 right-0 h-full object-cover"/>
        <h2 className="text-6xl font-bold -rotate-90">Login</h2>
        </div>
      <form action="" className="w-full md:w-2/3 p-10 lg:p-36 font-light flex items-center">
        <div className="w-full">
        <div className="text-center md:text-left">
        <h2 className="text-white font-extrabold text-5xl font-display">Welcome</h2>
        <p className="text-muted-foreground text-xl mb-8">Lets log you in quickly</p>
        </div>
       <div className='mb-5'>
       <Input className={`w-full ${error.email&&'border-destructive'}`} placeholder="Enter your email" onChange={(e)=>{setIsError({...error,email:""});setEmail(e.target.value)}} />
       {error.email&&<p className="text-destructive text-[9px] mt-0 font-thin">{error.email}</p> }
       </div>
        <div className="mb-5">
        <Input className={`w-full ${error.password&&'border-destructive'}`} placeholder="Enter your password" onChange={(e)=>{setPassword(e.target.value)}} />
        {error.password&&<p className="text-destructive text-[9px] mt-0 font-thin">{error.password}</p> }
        </div>
       
        <div className="flex justify-between flex-col md:flex-row">
          <Button type="button"className="w-fit" onClick={login} >LogIn</Button>
          <div className="text-sm mt-5 md:mt-0">
            <p >
              don't have an account<span className="text-primary">?</span>
            </p>
            <Button
              variant={"link"}
              className="p-0 m-0 h-auto text-xs"
              type="button"
              >
              Sign-up
            </Button>
          </div>
        </div>
              </div>
      </form>
    </div>
  </div>
  );
}

export default LogIn;
