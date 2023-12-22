import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Blog from './Blog'
import { useLocation, useNavigate } from 'react-router-dom'
import { blogGroup } from '@/assets/content'
import { icons } from '@/assets/content'
import { auth, db } from '@/config/firebase'
import { getDocs, collection, setDoc, doc ,addDoc,deleteDoc ,getDoc,updateDoc, onSnapshot } from 'firebase/firestore'
import { getUserName } from './BlogPage'
function Blogs() {
    const location = useLocation()
    const navigate = useNavigate()
    const [blogs,setBlogs] = useState<any[]>([])
    const [userName,setUserName] = useState('')
    
    
    
    useEffect(()=>{getUserName().then((res:string)=>setUserName(res.slice(0,1).toUpperCase()))},[getUserName()])

    useEffect(() => {
     
      const unsubscribe = onSnapshot(collection(db, 'blogs'), (snapshot) => {
        let updatedBlogs = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).reverse();
        if (location.pathname === '/trending') {
          updatedBlogs = updatedBlogs.sort((a: any, b:any) => (b.likes.length || 0) - (a.likes.length || 0));
          console.log(location.pathname)
        }
        setBlogs(updatedBlogs);
      });
    
      return () => {
        unsubscribe();
      };
    }, [location.pathname]);
  //  useEffect(()=>{
    // const crea = async () => {
    //   const myColl =  collection(db, 'blogs')
    //   blogGroup.forEach((blog,index)=>{
    //     const myFunc = async () => {
    //       setDoc(doc(myColl,blog.id),blog)
    //     }
    //     myFunc()
    //     })
    //   // await addDoc(myColl, {name:'khaid'}).then(()=>{console.log('done')})
    // }
    // crea()

  //   const getBlogs = async () =>{
     
  //       const blogs =  (await getDocs(collection(db, 'blogs')))
  //       const filteredData = blogs.docs.map((doc) => ({
  //         ...(doc.data()),
  //         id: doc.id,
  //       }))
  //       console.log(filteredData)
  //       setBlogs(filteredData)

  //   }
  //   getBlogs()
  //  },[])
  return (
<div className='flex flex-col lg:flex-row-reverse '>
  <main className='flex-1 px-10 p-20 lg:p-24 flex flex-col gap-10 overflow-y-scroll h-screen'>
    <h2 className=' relative w-fit text-xl pt-2 mb-20 lg:mb-16 mx-auto lg:mx-[unset] content-none after:absolute after:top-0 after:bg-primary after:w-5 after:h-1 after:left-1/2 after:-translate-x-1/2'>{location.pathname.length>2?location.pathname.slice(1):'Latest'}
    </h2>
    {blogs?.map((blog,index)=><Blog key={index} blog={blog}/>)}
    
  </main>
  <aside className='fixed bottom-5 left-[5vw] sm:left-[8vw] lg:left-0 lg:bottom-0 lg:relative w-[calc(90vw)]  sm:w-[calc(84vw)]    lg:w-[95px]  h-[67px] sm:h-[95px] lg:h-screen flex flex-row lg:flex-col items-center justify-between p-4 border-primary border-2 lg:border-0 !border-r-2 lg:py-14 bg-background '>
    <div className='w-full flex flex-row lg:flex-col items-center justify-between lg:justify-start lg:gap-10 h-full px-5 sm:px-10 '>
      <Button className='flex items-center justify-center  rounded-full bg-primary text-black aspect-square text-xl lg:text-3xl w-7 lg:w-full' onClick={()=>{navigate('/personal')}} >{userName}</Button>
      <Button className='bg-transparent hover:bg-transparent flex flex-col p-0' onClick={()=>navigate('/search')}>
        {icons.search}
        <p className='text-white text-xs font-light hidden lg:block'>Search</p>
      </Button>
      <Button className='bg-transparent hover:bg-transparent flex flex-col p-0'
      onClick={()=>{navigate('/trending')}}
      >
        {icons.trending}
        <p className='text-white text-xs font-light hidden lg:block'>Trending</p>
      </Button>
      <Button className='bg-transparent hover:bg-transparent flex lg:hidden flex-col p-0'
      onClick={()=>{navigate('/trending')}}
      >
        {icons.add}
        <p className='text-white text-xs font-light hidden lg:block'>Trending</p>
      </Button>
    </div>
    <Button className='bg-transparent hover:bg-transparent flex-col p-0 hidden lg:flex'
    onClick={()=>{navigate('/post')}}
    >
      {icons.add}
      <p className='text-white text-xs font-light hidden lg:block' >Add</p>
    </Button>
  </aside>
</div>
  )
}

export default Blogs