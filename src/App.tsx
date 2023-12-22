import {} from 'firebase/app'
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import BlogPage from "./components/BlogPage";
import Post from "./components/Post";
import { MantineProvider } from "@mantine/core";
import SearchPage from "./components/SearchPage";
import PersonalPage from "./components/PersonalPage";


const App = () => {
 
    
 

  return (
    <MantineProvider>

    <div className="bg-background  text-white selection:bg-primary selection:text-background" >
       <Routes>
        <Route path="/post" element= {<Post/>}/>
        <Route path="/" element={<Blogs/>}/>
        <Route path="/:blogId" element={<BlogPage/>}/>
        <Route path="/trending" element={<Blogs/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/yourPosts" element={<PersonalPage/>}/>
       </Routes>
    </div>

    </MantineProvider>
  );
};

export default App;
