import React,{useState} from 'react'
import {auth,googleProvider} from '../config/firebase'
import {createUserWithEmailAndPassword,signInWithPopup,signOut,signInWithEmailAndPassword,} from 'firebase/auth'
function Auth() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    console.log(auth)
    const signIn = async () => {
        await createUserWithEmailAndPassword(auth,email,password)
    }
    const signInWithGoogle =async () => {
        await signInWithPopup(auth,googleProvider)
    }
    const logOut =async () => {
        signOut(auth)
    }
    const logIn = async () => {
        await signInWithEmailAndPassword(auth,email,password)
    }
  return (
    <div>
    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='email' />
    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="" id=""  placeholder='pass'/>
    <button onClick={signIn}>Sign In</button>
    <div></div>
    <button onClick={signInWithGoogle}>sigin with google</button>
    <div></div>
    <button onClick={logOut}>logout</button>
    <div onClick={logIn}>logIn</div>
    </div>
  )
}

export default Auth