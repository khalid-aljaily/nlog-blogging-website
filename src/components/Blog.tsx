import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import parce from 'html-react-parser'
import { db } from '@/config/firebase'
export type blogProps = {
    date: {
        dateNow:number,
      year: string,
      day: string,
      month: string,
    },
    title: string,
    tags: string[],
    author: string,
    content: string,
    likes: string[],
    comments:{id:string,message:string,user:{id:string,name:string},likes?:string[],replys?:{message:string,user:{id:string,name:string}}[]}[],
  }

function Blog({blog}:{blog:blogProps}) {
    const navigate = useNavigate()
  return (
    <div>
        <div className='flex flex-col md:flex-row-reverse gap-4'>

        <div>
            <h3 className='text-xl md:text-3xl font-display text-primary'>
                {blog.title}
            </h3>
            <p className='font-normal'>
                {parce(blog.content.slice(0,500)+' ')}
                <Button variant={'link'} className='p-0'
                onClick={()=>navigate('/blog',{state:blog})}
                >. . . read more</Button>
            </p>
            <div className=' hidden md:flex flex-wrap gap-5 mt-2'>
            {blog.tags.map((tag,idx)=><Badge key={idx} variant={'outline'} className='font-light min-w-[90px] justify-center border-primary'>#{tag}</Badge>)}
        </div>
        </div>
        <div className='flex flex-row md:flex-col gap-1 justify-between md:justify-start'>
            <div className='text-base md:text-3xl font-medium text-right flex flex-row md:flex-col space-x-2 '>
                <p>{blog.date.day}</p>
                <p>{blog.date.month}</p>
                <p className='block md:hidden'>{blog.date.year}</p>
            </div>
            <div>
                <p className='md:[writing-mode:vertical-rl] md:rotate-180 w-fit ml-auto font-light'>@{blog.author}</p>
            </div>
        </div>
        </div>
        {/* hash */}
        <div className='flex md:hidden flex-wrap mt-2 gap-5'>
            {blog.tags.map((tag,idx)=><Badge key={idx} variant={'outline'} className='font-light min-w-[90px] justify-center border-primary'>{tag}</Badge>)}
        </div>
    </div>
  )
}

export default Blog