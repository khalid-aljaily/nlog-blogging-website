import { useEffect, useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import Editor from './Editor'
import 'draft-js/dist/Draft.css';
import { addDoc, collection } from 'firebase/firestore';
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
  const [title,setTitle] = useState('')
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[] >([]);
  const [isError,setIsError] = useState({
    title:''
  })

  const navigate = useNavigate()

  // to remove the error state from the content feild
  useEffect(()=>{
    if(document.querySelector('.tiptap')?.classList.contains('!border-destructive')){
     document.querySelector('.tiptap')?.classList.remove('!border-destructive')
    }
  },[editor?.getText().length])


  
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

  const validate = async () => {
    if(title===''){
      setIsError((prevError) => ({
        ...prevError,
        title: 'Title is required',
      }))
    }
   if(editor?.getText().length==0){
   document.querySelector('.tiptap')?.classList.add('!border-destructive') 
   }
  else if(editor?.getText().length!==0&&title!==''){
     const post =   {
    date: getFormattedDate(),
    title,
    tags,
    author: {name:auth.currentUser?.displayName,id:auth.currentUser?.uid},
    content: document.querySelector('.tiptap')?.innerHTML,
    likes: [],
    comments: [
    ],
  }
await addDoc(collection(db, 'blogs'), post).then(() => {
  setTitle('');
  setTags([]);
  navigate('/')
})
}

  }


  const reset = () => {
    setTags([]); 
    const tiptapElement = document.querySelector('.tiptap') as HTMLElement;
    if (tiptapElement) {
      tiptapElement.innerHTML = '';
    }
    setTitle('');
  };





  return (
    <div className="px-10 p-20 lg:p-24">
      <h2 className="relative w-fit text-xl pt-2 mb-20 lg:mb-16 mx-auto lg:mx-[unset] content-none after:absolute after:top-0 after:bg-primary after:w-5 after:h-1 after:left-1/2 after:-translate-x-1/2">
        {location.pathname.length > 2 ? location.pathname.slice(1) : 'Latest'}
      </h2>
     {/* <Textarea className='rounded-none !outline-none font-light' placeholder='write your mind'/> */}
     
     <Input className={`mb-3 text-center ${isError.title&&'border-destructive'}`} placeholder='Title' value={title} onChange={(e)=>{setIsError({title:''});setTitle(e.target.value)}}/>
    <Editor editor = {editor}/>
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex flex-wrap gap-5">
          {tags?.map((tag:string, idx:number) => (
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
              if (!tags?.includes(tag) && tag !== '') {
                setTags([...tags , tag]);
                setTag('');
              }
            }}
            className='text-background'
          >
            Add
          </Button>
        </div>
        <div className="flex gap-3">
          <Button className="mt-2 bg-destructive hover:bg-destructive/80 text-background" 
          onClick={reset}
          >Reset</Button>
          <Button className="mt-2 flex-1" onClick={validate} >Post</Button>
        </div>
      </div>
      
    </div>
  );
}

export default Post;