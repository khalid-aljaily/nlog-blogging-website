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
import { createContext, useEffect, useState } from 'react';
import { auth, db } from './config/firebase';
import { User, getRedirectResult } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';


export const UserContext = createContext<any>(null);

const App = () => {
 
  const [user,setUser] = useState<{user:User,userName:string}>()

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user: any = await new Promise((resolve, reject) => {
          const unsubscribe = auth.onAuthStateChanged(
            (user) => {
              unsubscribe();
              resolve(user);
            },
            (error) => {
              unsubscribe();
              reject(error);
            }
          );
        });
  
        if (user) {
          return user;
        } else {
          // No user is signed in or the account is deleted
          return null;
        }
      } catch (error) {
        console.error('Error getting current user:', error);
        throw error;
      }
    };
  
    const fetchUserName = async (user: User) => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userName = userDoc.data()?.name;
        console.log(userName);
        setUser({ user, userName });
      } catch (error) {
        console.error('Error retrieving user name:', error);
      }
    };
  
    getCurrentUser().then(async (user: User) => {
      if (user) {
        // User is signed in
        await fetchUserName(user);
  
        // Listen for changes in userName
        const userRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userRef, (snapshot) => {
          const updatedUserName = snapshot.data()?.name;
          setUser((prevUser) => {
            if (prevUser) {
              return {
                ...prevUser,
                userName: updatedUserName,
              };
            } else {
              return prevUser; // Return the initial state value when prevUser is undefined
            }
          });
        });
  
        return () => unsubscribe();
      } else {
        // No user is signed in or the account is deleted
      }
    });
  
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        await fetchUserName(user);
      } else {
        // No user is signed in
        setUser(undefined);
      }
    });
  
    const handleRedirectResult = async () => {
      try {
        await getRedirectResult(auth);
      } catch (error) {
        console.error('Error handling redirect result:', error);
      }
    };
  
    handleRedirectResult();
 
  
    return () => unsubscribe();
  }, [auth]);
 console.log(auth)

  return (
    <MantineProvider>
      <UserContext.Provider value={{user:user,setUser:setUser}}>

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
      </UserContext.Provider>

    </MantineProvider>
  );
};

export default App;
