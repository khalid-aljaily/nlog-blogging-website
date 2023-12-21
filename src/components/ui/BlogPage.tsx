import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { blogProps } from '../Blog'
import { MessageCircle, ThumbsUp ,MessagesSquare} from 'lucide-react'
import { Badge } from './badge'
import { Collapsible,CollapsibleContent,CollapsibleTrigger } from './collapsible'
import { Textarea } from './textarea'
import { Button } from './button'
import parce from 'html-react-parser'
function BlogPage() {
    const {state}:{state:blogProps} = useLocation()

    const [current,setCurrent] = useState('')
  return (
    <div className='px-10 p-20 lg:p-24'>
        <h2 className='text-3xl md:text-[40px] font-display text-primary'>{state.title}</h2>
        <div className='my-2 space-y-1'>
        <p className='font-light text-muted-foreground text-base'>
            written by @{state.author}
        </p>
        <p className='font-light text-muted-foreground text-base'>
            on {state.date.day} {state.date.month} {state.date.year}
        </p>
        </div>
        <p >
            {parce(state.content)}
        </p>
        <div className='flex gap-5 flex-wrap mt-5'>
            {state.tags.map((tag,idx)=><Badge key={idx} variant={'outline'} className='font-light min-w-[90px] justify-center border-primary'>#{tag}</Badge>)}
        </div>
        <div className='h-[1px] w-full bg-muted-foreground my-5'/>
        <Collapsible>
        <div className='flex justify-around'>
            <button className='relative bg-transparent p-0'>
        <ThumbsUp  className='text-primary  '/>
        {state.likes.length!=0&&<span className='absolute top-0 -right-1 text-[9px] bg-primary text-black rounded-full
        px-[4px] h-fit'>{state.likes.length}</span>}
            </button>
        <CollapsibleTrigger className='relative'>
        <MessageCircle className='text-primary'/>
        <span className='absolute top-0 -right-1 text-[9px] bg-primary text-black rounded-full
        px-[4px] h-fit'>{state.comments.length}</span>
        </CollapsibleTrigger>
        </div>
        <CollapsibleContent className='space-y-5'>
        {state.comments&&state.comments.map((comment)=>
        <CommentCard key={comment.id} comment={comment} current={current} setCurrent={setCurrent} />
        )}
        <div className='flex gap-2 items-start mt-3'>
        <Textarea className='flex-1 rounded-none !outline-none' placeholder='Reply'/>
        <Button>Comment</Button>
      </div>
        </CollapsibleContent>
        </Collapsible>
       
        
        
    </div>
  )
}

export default BlogPage

interface Comment {
    id:string;
    message: string;
    user: {
      id: string;
      name: string;
    };
    likes?: string[];
    replies?: {
      message: string;
      user: {
        id: string;
        name: string;
      };
    }[];
  }

const CommentCard = ({
  comment,current,setCurrent
}: {
  comment: Comment,current:string,setCurrent: React.Dispatch<React.SetStateAction<string>>}) => {
   
    
  return (
    <Collapsible className='mt-3' open ={current==comment.id}>
        <div className='flex justify-between items-center'>
      <h3 className="text-primary">@ {comment.user.name}</h3>
        <div className="flex justify-around gap-4">
        <button className="relative">
          <ThumbsUp className="text-primary w-5" />
          {comment.likes?.length!=0&&<span className="absolute top-0 -right-1 text-[9px] bg-primary text-black rounded-full px-[4px] h-fit">
            {comment.likes?.length}
          </span>}
        </button>
        <CollapsibleTrigger>
    <MessagesSquare className="text-primary w-5" onClick={()=>{current==comment.id?setCurrent(''):setCurrent(comment.id)}} />
        </CollapsibleTrigger>
      </div>
        </div>
      <p className="text-xs">{comment.message}</p>
        <CollapsibleContent>
      {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3"> 
          {comment.replies&&comment.replies.map((reply, index) => (
              <div key={index} className="ml-4">
              <h5 className="text-primary text-xs">@ {reply.user.name}</h5>
              <p className="text-[10px]">{reply.message}</p>
            </div>
          ))}
      
      
      
        </div>
      )}
      {current==comment.id &&<div className='flex gap-2 items-start mt-3'>
        <Textarea className='flex-1 rounded-none !outline-none' placeholder='Reply'/>
        <Button>Reply</Button>
      </div>}
      <div className="h-[1px] w-full bg-muted-foreground/10 my-5" />
      </CollapsibleContent>
    </Collapsible>
  );
};

