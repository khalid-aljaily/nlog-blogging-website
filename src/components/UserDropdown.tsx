import React, { useContext, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { auth, db } from "@/config/firebase";
import { UserContext } from "@/App";
import { useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

function UserDropdown() {
  const userContext = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nameChange = async () => {
    if (auth.currentUser) {
      await setDoc(doc(collection(db, "users"), auth.currentUser.uid), {
        name: newName,
      }).then(() => {
        setOpen2(!open2);
        setNewName("");
        navigate("/");
      });
    }
  };
  console.log(userContext);

  const deleteAccount = async () => {
    if (password) {
      try {
        const Credential = EmailAuthProvider.credential(
          auth.currentUser?.email as string,
          password
        );
        await reauthenticateWithCredential(auth.currentUser as any, Credential);
        await reauthenticateWithCredential(auth.currentUser as any, Credential);
        auth.currentUser?.delete();
        setOpen(!open);
      } catch (err) {
        if (err.code == "auth/invalid-credential") {
          setError("wrong password");
        }
      }
    } else {
      setError("enter your password");
    }
  };

  return (
    <>
      {/* delete alert */}
      <AlertDialog open={open}>
        <AlertDialogContent
          className="border-primary"
          onEscapeKeyDown={() => setOpen(false)}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
            <div className="my-3">
              <label
                htmlFor="password"
                className="text-muted-foreground text-sm mb-1 block"
              >
                your password
              </label>
              <Input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                id="password"
              />
              {error && <p className="text-destructive text-xs">{error}</p>}
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              autoFocus={false}
              onClick={() => setOpen(false)}
              className="!outline-none text-background bg-primary hover:bg-primary/80"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="text-background bg-destructive hover:bg-destructive/80"
              onClick={deleteAccount}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* name change alert  */}
      <Dialog open={open2}>
        <DialogContent className="border-primary !rounded-none">
          <DialogClose
            className="absolute right-4 top-4 rounded-sm opacity-70 text-white ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={() => setOpen2(!open2)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="text-white">Name Change</DialogTitle>
            <label htmlFor="newName" className="text-muted-foreground text-sm">
              your new name
            </label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              id="newName"
              className="my-2"
            />
            <Button onClick={nameChange}>Change</Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* userDropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none cursor-pointer bg-primary w-9  md:w-12 rounded-full text-2xl md:text-3xl h-9 md:h-12 flex items-center justify-center !text-background hover:bg-primary/80 active:translate-y-[1px] active:bg-primary/80 font-bold">
          {userContext.user?.userName ? (
            userContext.user?.userName.slice(0, 1).toUpperCase()
          ) : (
            <CircleUser className="text-background p-0 flex-1 w-8 h-7 " />
          )}
        </DropdownMenuTrigger>
        {userContext.user?.userName ? (
          <DropdownMenuContent className="rounded-none bg-background text-white ml-4 border-primary px-5">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-primary" />
            <DropdownMenuItem
              className="rounded-none cursor-pointer hover:!bg-primary hover:!text-background"
              onClick={() => {
                setOpen2(!open2);
              }}
            >
              Change Name
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-none cursor-pointer hover:!bg-primary hover:!text-background"
              onClick={() => {
                {
                  auth.signOut().then(() => {
                    userContext.setUser({ user: null, userName: "" });
                  });
                }
              }}
            >
              Sign out
            </DropdownMenuItem>
            <DropdownMenuItem
              className="!text-destructive hover:!bg-destructive hover:!text-background rounded-none"
              onClick={() => {
                setOpen(!open);
              }}
            >
              Delete Account
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-primary" />
            <DropdownMenuItem
              className="rounded-none cursor-pointer hover:!bg-primary hover:!text-background my-2"
              onClick={() => {
                navigate("/yourPosts");
              }}
            >
              My Posts
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className="rounded-none bg-background text-white ml-4 border-primary px-5">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-primary" />
            <DropdownMenuItem
              className="rounded-none cursor-pointer hover:!bg-primary hover:!text-background"
              onClick={() => {
                navigate("/login");
              }}
            >
              log in
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-none cursor-pointer hover:!bg-primary hover:!text-background"
              onClick={() => {
                navigate("/signUp");
              }}
            >
              create an account
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
}

export default UserDropdown;

export const LogInModal = ({ trigger }: { trigger: React.ReactNode }) => {
  const navigate = useNavigate();
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="border-primary !rounded-none">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 text-white ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-white">Log In</DialogTitle>
          <DialogDescription>
            you are not currently logged in, please log in or create an account
            to continue.
          </DialogDescription>
          <div className="flex justify-center gap-10 mt-10">
            <Button
              onClick={() => navigate("/signUp")}
              variant={"outline"}
              className="text-primary hover:text-background hover:bg-primary"
            >
              {" "}
              create account
            </Button>
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              login
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
