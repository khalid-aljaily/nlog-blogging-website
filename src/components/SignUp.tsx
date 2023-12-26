import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import bg from "../assets/bg.webp";
import { auth } from "../config/firebase";
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BellRing, EyeOff } from "lucide-react";
import { useToast } from "./ui/use-toast";


function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf, setConf] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,setShowConfirm] = useState(false);
  const {toast} = useToast()

  const [isError, setIsError] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const signup = async () => {
    if (email === "") {
      setIsError((prevError) => ({
        ...prevError,
        email: "Email is required",
      }));
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email) {
      setIsError((prevError) => ({
        ...prevError,
        email: "Email is invalid",
      }));
    }
    if (password.length < 6) {
      setIsError((prevError) => ({
        ...prevError,
        password: "Password must be at least 6 characters",
      }));
    }
    if (userName === "") {
      setIsError((prevError) => ({
        ...prevError,
        userName: "Name is required",
      }));
    }
    if (conf === "") {
      setIsError((prevError) => ({
        ...prevError,
        confirmPassword: "Please confirm your password",
      }));
    }
    if (conf !== password) {
      setIsError((prevError) => ({
        ...prevError,
        confirmPassword: "This dosn't match your password",
      }));
    } else {
      // If all fields are valid, proceed with signup
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser!, {
          displayName:userName
         }).then(()=>{
          toast({
            description:'You can log-in now!',
            title:'Success!',
            className:'bg-primary border-none rounded-none text-background p-2 top-0',
            action:<BellRing className="mr-3"/>,
          });
         });
        setEmail("");
            setPassword("");
            setUserName("");
            setConf("");
            navigate("/");
      } catch (err: any) {
        if (err.code == "auth/email-already-in-use") {
          setIsError((prevError) => {
            return {
              ...prevError,
              email: "Email is already in use",
            };
          });
        }
      }
    }
  };


  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex w-full h-full ">
        <div className=" w-1/3  h-full overflow-hidden relative  items-center justify-center border-r-[4px] border-primary border-solid hidden md:flex">
          <img
            src={bg}
            alt="bg"
            className="max-w-[unset]  absolute top-0 right-0 h-full object-cover"
          />
          <h2 className="text-6xl font-bold -rotate-90">Sign Up</h2>
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
                Lets sign you up quickly
              </p>
            </div>
            <div className="mb-5">
              <Input
                className={`w-full  ${
                  isError.userName && "border-destructive"
                }`}
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => {
                  setIsError({ ...isError, userName: "" });
                  setUserName(e.target.value);
                }}
              />
              {isError.userName && (
                <p className="text-destructive text-[9px] mt-0 font-thin">
                  {isError.userName}
                </p>
              )}
            </div>
            <div className="mb-5">
              <Input
                className={`w-full ${isError.email && "border-destructive"}`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setIsError({ ...isError, email: "" });
                  setEmail(e.target.value);
                }}
              />
              {isError.email && (
                <p className="text-destructive text-[9px] mt-0 font-thin">
                  {isError.email}
                </p>
              )}
            </div>
            <div></div>
            <div className="mb-5 relative">
              <Input
                className={`w-full ${isError.password && "border-destructive"}`}
                placeholder="Enter password"
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setIsError({ ...isError, password: "" });
                  setPassword(e.target.value);
                }}
              />
              {isError.password && (
                <p className="text-destructive text-[9px] mt-0 font-thin">
                  {isError.password}
                </p>
              )}
              <Button className="absolute top-0 right-0 px-2" type="button"
              onClick={() => setShowPassword(!showPassword)}
              ><EyeOff className="text-background"/></Button>
            </div>
            <div className="mb-5 relative">
              <Input
                className={`w-full ${
                  isError.confirmPassword && "border-destructive"
                }`}
                placeholder="Confirm password"
                value={conf}
                type={showConfirm ? "text" : "password"}
                onChange={(e) => {
                  setIsError({ ...isError, confirmPassword: "" });
                  setConf(e.target.value);
                }}
              />
              {isError.confirmPassword && (
                <p className="text-destructive text-[9px] mt-0 font-thin">
                  {isError.confirmPassword}
                </p>
              )}
              <Button className="absolute top-0 right-0 px-2" type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              ><EyeOff className="text-background"/></Button>
            </div>

            <div>
              <div className="flex justify-between flex-col md:flex-row">


              <Button type="button" className="w-fit" onClick={signup}>
                Submit
              </Button>
              <div className="text-sm mt-5 md:mt-0">
                <p>
                  don't have an account<span className="text-primary">?</span>
                </p>
                <Button
                  variant={"link"}
                  className="p-0 m-0 h-auto text-xs"
                  type="button"
                  onClick={() => navigate("/login")}
                  >
                  Log-in
                </Button>
                  </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
