import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import bg from "../assets/bg.jpg";
import { confirmPasswordReset, sendPasswordResetEmail, signInWithEmailAndPassword, validatePassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { EyeOff, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useToast } from "./ui/use-toast";
function LogIn() {
  const [email, setEmail] = useState("dummy@gmail.com");
  const [password, setPassword] = useState("000000");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [resetEmail,setResetEmail] = useState('')
  const [error, setIsError] = useState({
    email: "",
    password: "",
  });

  const {toast} = useToast()

  const login = async () => {
    if (email === "" || password === "") {
      if (email === "") {
        setIsError((prevError) => ({
          ...prevError,
          email: "Email is required",
        }));
      }
      if (password === "") {
        setIsError((prevError) => ({
          ...prevError,
          password: "please enter your password",
        }));
      }
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password).then(() =>
        navigate("/")
      );
     
    } catch (error: any) {
      // Handle specific error cases
      if (error.code === "auth/invalid-email") {
        setIsError((prevError) => ({
          ...prevError,
          email: "Email is invalid",
        }));
      } else if (error.code === "auth/invalid-credential") {
        setIsError((prevError) => ({
          ...prevError,
          password: "wrong password",
        }));
      }
    }
  };

  const resetPassword = async () => {
  sendPasswordResetEmail(auth,resetEmail).then(()=>{
    toast({
      description:'please check up your email to reset your password.',
      title:'Email sent!',
      className:'bg-primary border-none rounded-none text-background p-2 top-0',
    });
    setOpen(!open);
    setResetEmail('');
  })
  }
  
  return (
    <>
     <Dialog open={open} >
        <DialogContent className="border-primary !rounded-none w-[90%] mx-auto">
          <DialogClose
            className="absolute right-4 top-4 rounded-sm opacity-70 text-white ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={() => {setOpen(!open);setResetEmail('')}}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="text-white">Passowrd reset</DialogTitle>
            <label htmlFor="newName" className="text-muted-foreground text-sm">
              please enter your email
            </label>
            <Input
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              id="newName"
              className="my-2"
            />
            <Button onClick={resetPassword} className="!mt-2" >send</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex w-full h-full ">
        <div className=" w-1/3  h-full overflow-hidden relative  items-center justify-center border-r-[4px] border-primary border-solid hidden md:flex">
          <img
            src={bg}
            alt="bg"
            className="max-w-[unset]  absolute top-0 right-0 h-full object-cover"
            />
          <h2 className="text-6xl font-bold -rotate-90">Login</h2>
        </div>
        <form
          action=""
          className="w-full md:w-2/3 p-10 lg:p-36 font-light flex items-center"
        >
          <div className="w-full">
            <div className="text-center md:text-left">
              <h2 className="text-white font-extrabold text-5xl font-display">
                Welcome
              </h2>
              <p className="text-muted-foreground text-xl mb-8">
                Lets log you in quickly
              </p>
            </div>
            <div className="mb-5">
              <Input
                className={`w-full ${error.email && "border-destructive"}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setIsError({ ...error, email: "" });
                  setEmail(e.target.value);
                }}
              />
              {error.email && (
                <p className="text-destructive text-[9px] mt-0 font-thin">
                  {error.email}
                </p>
              )}
            </div>
            <div className="mb-5 relative">
              <Input
                className={`w-full ${error.password && "border-destructive"}`}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {error.password && (
                <p className="text-destructive text-[9px] mt-0 font-thin">
                  {error.password}
                </p>
              )}
              <Button className="absolute top-0 right-0 px-2" type="button"
              onClick={() => setShowPassword(!showPassword)}
              ><EyeOff className="text-background"/></Button>
            </div>

            <div className="flex justify-between flex-col md:flex-row items-center">
              <Button type="button" className="w-fit" onClick={login}>
                LogIn
              </Button>
              <Button
                  variant={"link"}
                  className="p-0 h-auto text-xs mt-5 md:mt-0"
                  type="button"
                  onClick={() => setOpen(!open)}
                >
                  forgot your password?
                </Button>
              
              
            </div>
            <div className="text-sm mt-3 flex flex-col justify-center ">

                <p className="text-center">
                  don't have an account<span className="text-primary">?</span>
                </p>
                <Button
                  variant={"link"}
                  className="p-0 m-0 h-auto text-xs"
                  type="button"
                  onClick={() => navigate("/signup")}
                >
                  Sign-up
                </Button>
                
              </div>
              
          </div>
        </form>
      </div>
    </div>
</>
  );
}

export default LogIn;
