import React, {  } from "react";
import {} from 'firebase/app'
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import BlogPage from "./components/ui/BlogPage";
import Post from "./components/Post";
import { MantineProvider } from "@mantine/core";

const App: React.FC = () => {
 

  return (
    <MantineProvider>

    <div className="bg-background  text-white selection:bg-primary selection:text-background" >
       <Routes>
        <Route path="/post" element= {<Post/>}/>
        <Route path="/" element={<Blogs/>}/>
        <Route path="/blog" element={<BlogPage/>}/>
        <Route path="/trending" element={<Blogs/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
       </Routes>
    </div>
    </MantineProvider>
  );
};

export default App;
