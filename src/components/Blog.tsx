import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import parce from "html-react-parser";
import { auth, db } from "@/config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Trash2 } from "lucide-react";
export type blogProps = {
  id: string;
  date: {
    dateNow: number;
    year: string;
    day: string;
    month: string;
  };
  title: string;
  tags: string[];
  author: {
    name: string;
    id: string;
  };
  content: string;
  likes: string[];
  comments: {
    id: string;
    message: string;
    user: { id: string; name: string };
    likes?: string[];
    replies?: {
      id: number;
      message: string;
      user: { id: string; name: string };
    }[];
  }[];
};

function Blog({ blog }: { blog: blogProps }) {

  const navigate = useNavigate();


  const deleteBlog = async () => {
    await deleteDoc(doc(db, "blogs", blog.id));
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row-reverse gap-4 justify-end">
        <div
          className={`${
            blog.author.id == auth.currentUser?.uid &&
            location.pathname == "/yourPosts" &&
            "flex flex-row-reverse justify-between items-start flex-1"
          }`}
        >
          {blog.author.id == auth.currentUser?.uid &&
            location.pathname == "/yourPosts" && (
              <Button className="justify-self-start p-0 !bg-transparent"
              onClick={deleteBlog}
              >
                <Trash2 className="text-destructive stroke-[2px] w-5 h-5" />
              </Button>
            )}
          <div>
            <h3 className="text-xl md:text-3xl font-display text-primary">
              {blog.title}
            </h3>
            <p className="font-normal">
              {parce(blog.content.slice(0, 500) + " ")}
              <Button
                variant={"link"}
                className="p-0"
                onClick={() => navigate(`/${blog.id}`)}
              >
                . . . read more
              </Button>
            </p>
            <div className=" hidden md:flex flex-wrap gap-5 mt-2">
              {blog.tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant={"outline"}
                  className="font-light min-w-[90px] justify-center border-primary"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row md:flex-col gap-1 justify-between md:justify-start">
          <div className="text-base md:text-3xl font-medium text-right flex flex-row md:flex-col space-x-2 ">
            <p>{blog.date.day}</p>
            <p>{blog.date.month}</p>
            <p className="block md:hidden">{blog.date.year}</p>
          </div>
          <div>
            <p className="md:[writing-mode:vertical-rl] md:rotate-180 w-fit ml-auto font-light">
              @{blog.author.name}
            </p>
          </div>
        </div>
      </div>
      {/* hash */}

      <div className="flex md:hidden flex-wrap mt-2 gap-5">
        {blog.tags.map((tag, idx) => (
          <Badge
            key={idx}
            variant={"outline"}
            className="font-light min-w-[90px] justify-center border-primary"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default Blog;
