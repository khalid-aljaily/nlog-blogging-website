import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { blogProps } from "./Blog";
import { MessageCircle, ThumbsUp, MessagesSquare, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import parce from "html-react-parser";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";

import { LogInModal } from "./UserDropdown";

function BlogPage() {
  const params = useParams();
  const [comment, setComment] = useState("");
  const [current, setCurrent] = useState("");

  
  const [state, setState] = useState<any>(null); //the actual blog
  const blogId = params.blogId as string;

  useEffect(() => {
    const docRef = doc(db, "blogs", blogId);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const updatedBlog = { ...snapshot.data(), id: snapshot.id };
        setState(updatedBlog);
      } else {
        // Handle the case when the blog doesn't exist
        console.log("Blog not found");
        setState(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [blogId]);

    
  //
  const like = async () => {
    const likesToAdd = auth.currentUser?.uid;
    const blogDocRef = doc(db, "blogs", state.id);
    try {
      const blogDocSnapshot = await getDoc(blogDocRef);
      if (blogDocSnapshot.exists()) {
        const blogData = blogDocSnapshot.data();
        const currentLikes = blogData.likes || [];
        const updatedLikes = [...currentLikes, likesToAdd];
        if (currentLikes.includes(auth.currentUser?.uid)) {
          await updateDoc(blogDocRef, {
            likes: currentLikes.filter(
              (like: string) => like !== auth.currentUser?.uid
            ),
          });
        } else {
          await updateDoc(blogDocRef, { likes: updatedLikes });
        }
      }
    } catch (error) {
      console.log("Error updating likes:", error);
    }
  };
  //
  const AddComment = async () => {
    if (comment)
      await updateDoc(doc(db, "blogs", state.id), {
        comments: [
          ...state.comments,
          {
            id: Date.now().toString(),
            likes: [],
            message: comment,
            user: {
              id: auth.currentUser?.uid,
              name: auth.currentUser?.displayName,
            },
            replies: [],
          },
        ],
      }).then(() => {
        setComment("");
      });
  };

  if (state)
    return (
      <div className="px-10 p-20 lg:p-24">
        <h2 className="text-3xl md:text-[40px] font-display text-primary">
          {state.title}
        </h2>
        <div className="my-2 space-y-1">
          <p className="font-light text-muted-foreground text-base">
            written by @{state.author.name}
          </p>
          <p className="font-light text-muted-foreground text-base">
            on {state.date.day} {state.date.month} {state.date.year}
          </p>
        </div>
        <p>{parce(state.content)}</p>
        <div className="flex gap-5 flex-wrap mt-5">
          {state.tags.map((tag: string, idx: number) => (
            <Badge
              key={idx}
              variant={"outline"}
              className="font-light min-w-[90px] justify-center border-primary"
            >
              #{tag}
            </Badge>
          ))}
        </div>
        <div className="h-[1px] w-full bg-muted-foreground my-5" />
        <Collapsible>
          <div className="flex justify-around">
            {auth.currentUser ? (
              <button className={`relative bg-transparent p-0 `} onClick={like}>
                <ThumbsUp
                  className={`text-primary  ${
                    state.likes.includes(auth.currentUser?.uid as string) &&
                    "fill-primary"
                  }`}
                />
                {state.likes.length != 0 && (
                  <span
                    className="absolute top-0 -right-1 text-[9px] bg-primary text-black rounded-full
                    px-[4px] h-fit"
                  >
                    {state.likes.length}
                  </span>
                )}
              </button>
            ) : (
              <LogInModal
                trigger={
                  <button className={`relative bg-transparent p-0 `}>
                    <ThumbsUp
                      className={`text-primary `}
                    />
                    {state.likes.length != 0 && (
                      <span
                        className="absolute top-0 -right-1 text-[9px] bg-primary text-black rounded-full
                        px-[4px] h-fit"
                      >
                        {state.likes.length}
                      </span>
                    )}
                  </button>
                }
              />
            )}

            <CollapsibleTrigger className="relative">
              <MessageCircle className="text-primary" />
              <span
                className="absolute top-0 -right-1 text-[9px] bg-primary text-black rounded-full
                px-[4px] h-fit"
              >
                {state.comments.length}
              </span>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-5">
            {state.comments &&
              state.comments.map((comment: Comment) => (
                <CommentCard
                  state={state}
                  key={comment.id}
                  comment={comment}
                  current={current}
                  setCurrent={setCurrent}
                />
              ))}
            <div className="flex gap-2 items-start mt-3">
              <Textarea
                className="flex-1 rounded-none !outline-none"
                placeholder="Reply"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {auth.currentUser ? (
                <Button onClick={AddComment}>Comment</Button>
              ) : (
                <LogInModal trigger={<Button>Comment</Button>} />
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
}

export default BlogPage;

interface Comment {
  id: string;
  message: string;
  user: {
    id: string;
    name: string;
  };
  likes?: string[];
  replies?: {
    id: number;
    message: string;
    user: {
      id: string;
      name: string;
    };
  }[];
}

const CommentCard = ({
  comment,
  current,
  setCurrent,
  state,
}: {
  comment: Comment;
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
  state: blogProps;
}) => {
  const [reply, setReply] = useState("");

  //
  const postReply = async (commentId: string) => {
    const commentIndex = state.comments.findIndex(
      (comment) => comment.id === commentId
    );
    if (commentIndex !== -1 && reply.length != 0) {
      const newReply = {
        id: Date.now(),
        message: reply,
        user: {
          id: auth.currentUser?.uid as string,
          name: auth.currentUser?.displayName,
        },
      };

      const updatedComments = state.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      });

      await updateDoc(doc(db, "blogs", state.id), {
        comments: updatedComments,
      });

    }
  };

  //
  const likeComment = async (commentId: string) => {
    const commentIndex = state.comments.findIndex(
      (comment) => comment.id === commentId
    );
    if (commentIndex !== -1) {
      const updatedComments = state.comments.map((comment) => {
        if (comment.id === commentId) {
          const likesSet = new Set(comment.likes);
          if (likesSet.has(auth.currentUser?.uid as string)) {
            likesSet.delete(auth.currentUser?.uid as string);
          } else {
            likesSet.add(auth.currentUser?.uid as string);
          }
          return {
            ...comment,
            likes: Array.from(likesSet),
          };
        }
        return comment;
      });

      await updateDoc(doc(db, "blogs", state.id), {
        comments: updatedComments,
      });

    }
  };
  //
  const deleteReply = async (id: number) => {
    await updateDoc(doc(db, "blogs", state.id), {
      comments: state.comments.map((comment) => {
        if (comment.id === current) {
          return {
            ...comment,
            replies: comment.replies?.filter((reply) => reply.id !== id),
          };
        }
        return comment;
      }),
    });
  };
  //
  const deleteComment = async (id: string) => {
    await updateDoc(doc(db, "blogs", state.id), {
      comments: state.comments.filter((comment) => comment.id !== id),
    });
  };
  return (
    <Collapsible className="mt-3" open={current == comment.id}>
      <div className="flex justify-between items-center gap-3">
        <div className="flex justify-between flex-1 items-center">
          <h3 className="text-primary">@ {comment?.user?.name}</h3>
          {comment.user.id == auth.currentUser?.uid && (
            <Button
              className="!bg-transparent p-0 mt-1"
              onClick={() => {
                deleteComment(comment.id);
              }}
            >
              <Trash2 className="text-destructive h-5 w-5" />{" "}
            </Button>
          )}
        </div>
        <div className="flex justify-around gap-4">
          {auth.currentUser ? (
            <button
              className="relative"
              onClick={() => likeComment(comment.id)}
            >
              <ThumbsUp
                className={`text-primary w-5 ${
                  comment.likes?.includes(auth.currentUser?.uid as string) &&
                  "fill-primary"
                }`}
              />
              {comment.likes?.length != 0 && (
                <span className="absolute top-0 -right-1 text-[9px] bg-primary text-black rounded-full px-[4px] h-fit">
                  {comment.likes?.length}
                </span>
              )}
            </button>
          ) : (
            <LogInModal
              trigger={
                <button className="relative">
                  <ThumbsUp
                    className={`text-primary w-5`}
                  />
                  {comment.likes?.length != 0 && (
                    <span className="absolute top-0 -right-1 text-[9px] bg-primary text-black rounded-full px-[4px] h-fit">
                      {comment.likes?.length}
                    </span>
                  )}
                </button>
              }
            />
          )}

          <CollapsibleTrigger>
            <MessagesSquare
              className="text-primary w-5"
              onClick={() => {
                current == comment.id ? setCurrent("") : setCurrent(comment.id);
              }}
            />
          </CollapsibleTrigger>
        </div>
      </div>
      <p className="text-xs">{comment.message}</p>
      <CollapsibleContent>
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            {comment.replies &&
              comment.replies.map((reply, index) => (
                <div
                  key={index}
                  className="pl-2 ml-2  border-l border-x-muted-foreground flex justify-between items-start"
                >
                  <div>
                    <h5 className="text-primary text-xs">
                      @ {reply.user.name}
                    </h5>
                    <p className="text-[10px]">{reply.message}</p>
                  </div>
                  {reply.user.id == auth.currentUser?.uid && (
                    <Button
                      className="!bg-transparent p-0"
                      onClick={() => {
                        deleteReply(reply.id);
                      }}
                    >
                      <Trash2 className="text-destructive h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
          </div>
        )}
        {current == comment.id && (
          <div className="flex gap-2 items-start mt-3">
            <Textarea
              className="flex-1 rounded-none !outline-none"
              placeholder="Reply"
              value={reply}
              onChange={(e) => {
                setReply(e.target.value);
              }}
            />
            {!auth.currentUser ? (
              <LogInModal trigger={<Button>Reply</Button>} />
            ) : (
              <Button
                onClick={() => {
                  postReply(comment.id);
                }}
              >
                Reply
              </Button>
            )}
          </div>
        )}
        <div className="h-[1px] w-full bg-muted-foreground/10 my-5" />
      </CollapsibleContent>
    </Collapsible>
  );
};
