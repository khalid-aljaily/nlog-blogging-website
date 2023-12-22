import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Blog from './Blog'
import { useLocation, useNavigate } from 'react-router-dom'
import { icons } from '@/assets/content'
import { db } from '@/config/firebase'
import { collection,  getDocs, } from 'firebase/firestore'
import { Input } from './ui/input'
import { getUserName } from './BlogPage'

//dropdown
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
function Blogs() {
    const location = useLocation()
    const navigate = useNavigate()
    const [blogs,setBlogs] = useState<any[]>([])
    const [searchInput, setSearchInput] = useState<string | null>(null);
    const [userName,setUserName] = useState('')
    
    
    
    useEffect(()=>{getUserName().then((res:string)=>setUserName(res.slice(0,1).toUpperCase()))},[getUserName()])
    const fetchBlogs = async () => {
        try {
            if(searchInput!=='')
          {const snapshot = await getDocs(collection(db, 'blogs'));
    
          const updatedBlogs = snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((blog:any) => {
              const { title, tags } = blog;
              const searchTerm = searchInput?.toLowerCase() ?? "";
    
              const titleMatch = title.toLowerCase().includes(searchTerm);
              const tagsMatch = tags.some((tag:string) => tag.toLowerCase().includes(searchTerm));
    
              return titleMatch || tagsMatch;
            })
            .reverse();
    
          setBlogs(updatedBlogs);}
          else{
            setBlogs([])
          }
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      };
      console.log(blogs)
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
  <main className='flex-1 px-10 p-20 lg:p-24 flex flex-col gap-5 overflow-y-scroll h-screen'>
    <h2 className=' relative w-fit text-xl pt-2  mx-auto lg:mx-[unset] content-none after:absolute after:top-0 after:bg-primary after:w-5 after:h-1 after:left-1/2 after:-translate-x-1/2'>{location.pathname.length>2?location.pathname.slice(1):'Latest'}
    </h2>
    <div className='mb-20 lg:mb-16 flex gap-5'>
    <Input className='flex-1' onChange={(e)=>setSearchInput(e.target.value)} placeholder='find blogs by title or tag'/>
        <Button onClick={fetchBlogs}>Search</Button>
    </div>
    {blogs.length>0?blogs.map((blog,index)=><Blog key={index} blog={blog}/>):
    <p className='text-center text-muted-foreground'>no search results found</p>
    }
       
  </main>
  <aside className='fixed bottom-5 left-[5vw] sm:left-[8vw] lg:left-0 lg:bottom-0 lg:relative w-[calc(90vw)]  sm:w-[calc(84vw)]    lg:w-[95px]  h-[67px] sm:h-[95px] lg:h-screen flex flex-row lg:flex-col items-center justify-between p-4 border-primary border-2 lg:border-0 !border-r-2 lg:py-14 bg-background '>
    <div className='w-full flex flex-row lg:flex-col items-center justify-between lg:justify-start lg:gap-10 h-full px-5 sm:px-10 '>

    <DropdownMenu>
  <DropdownMenuTrigger className='outline-none !cursor-pointer' ><Button className='flex items-center justify-center  rounded-full bg-primary text-black aspect-square text-xl lg:text-3xl w-7 lg:w-full cursor-pointer' >{userName}</Button> </DropdownMenuTrigger>
  <DropdownMenuContent className='rounded-none bg-background text-white md:ml-4 border-primary px-5'>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator className='bg-primary' />
    <DropdownMenuItem className='rounded-none cursor-pointer hover:!bg-primary hover:text-black'>Change Name</DropdownMenuItem>
    <DropdownMenuItem className='rounded-none cursor-pointer hover:!bg-primary hover:text-black'>Sign out</DropdownMenuItem>
    <DropdownMenuItem className='text-destructive hover:!bg-destructive hover:text-black rounded-none '>Delete Account</DropdownMenuItem>
    <DropdownMenuSeparator className='bg-primary' />
    <DropdownMenuItem className='rounded-none cursor-pointer hover:!bg-primary hover:text-black my-2' >My Posts</DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>
      
      <Button className='bg-transparent hover:bg-transparent flex flex-col p-0'>
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