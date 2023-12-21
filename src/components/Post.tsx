import React, { useEffect, useRef, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import Editor from './Editor'
import 'draft-js/dist/Draft.css';
import parce from 'html-react-parser'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Link } from '@mantine/tiptap';
function Post() {
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],

  });
  const location = useLocation();
  const [content,setContent] = useState('')
  const [title,setTitle] = useState('')
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState(['tag1', 'tag2']);
  const [isError,setIsError] = useState({
    title:'',
    content:'',
  })
  const validate = () => {
    if(title===''){
      setIsError((prevError) => ({
        ...prevError,
        title: 'Title is required',
      }))
    }
   if(editor?.getText().length==0){
    setIsError((prevError) => {
      return {
        ...prevError,
        content: 'Content is required',
      }
    })
   }
  }
  useEffect(()=>{
    console.log('50')
  },[editor?.getText().length])

  const getUserName = async () =>{
    const uid =  auth?.currentUser?.uid
    const products =  await getDoc(doc(collection(db, `users`),uid))
    return products.data()?.name

  }
  function getFormattedDate() {
    const currentDate = new Date();
  
    const year = currentDate.getFullYear().toString();
    const day = currentDate.getDate().toString().padStart(2, '0');
  
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[currentDate.getMonth()];
    
    return {
      dateNow:Date.now(),
      year,
      day,
      month
    };
  }

const post =   {
  date: getFormattedDate(),
  title,
  tags,
  author: getUserName(),
  content: document.querySelector('.tiptap')?.innerHTML,
  likes: [],
  comments: [
  ],
}




  return (
    <div className="px-10 p-20 lg:p-24">
      <h2 className="relative w-fit text-xl pt-2 mb-20 lg:mb-16 mx-auto lg:mx-[unset] content-none after:absolute after:top-0 after:bg-primary after:w-5 after:h-1 after:left-1/2 after:-translate-x-1/2">
        {location.pathname.length > 2 ? location.pathname.slice(1) : 'Latest'}
      </h2>
     {/* <Textarea className='rounded-none !outline-none font-light' placeholder='write your mind'/> */}
     
     <Input className='mb-3 text-center' placeholder='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
    <Editor editor = {editor}/>
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex flex-wrap gap-5">
          {tags.map((tag, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="font-light min-w-[90px] border-primary inline-flex items-center gap-1 w-fit justify-around h-6"
            >
              #{tag}
              <button onClick={() => setTags(tags.filter((t) => t !== tag))}>
                <X className="w-3 text-destructive" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          <Input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="add a tag"
            className="font-light"
          />
          <Button
            onClick={() => {
              if (!tags.includes(tag) && tag !== '') {
                setTags([...tags, tag]);
                setTag('');
              }
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex gap-3">
          <Button className="mt-2 bg-destructive hover:bg-destructive/80" >Reset</Button>
          <Button className="mt-2 flex-1" onClick={validate} >Post</Button>
        </div>
      </div>
      <div className='target'  >{parce(`${content}`) }</div>
    </div>
  );
}

export default Post;