"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import { ModeToggle } from './theme-mode-toggle';
import { Separator } from '@/components/ui/separator'
import { PersonIcon,ChatBubbleIcon,EnvelopeClosedIcon,HomeIcon,GearIcon,BookmarkIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button";
import { RiHome2Fill } from "react-icons/ri";
import { FaUserAlt,FaEnvelope  } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { BsGearFill } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";
import Link from "next/link";
import { useRouter,usePathname } from 'next/navigation';
import { FaSearch } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {signOut} from "next-auth/react";
import { BiDotsVertical } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";
import { useRecoilState } from 'recoil';
import {userIdAtom} from "@/atoms/userIdAtom";
import { GET_USER_ID } from "@/graphql/queries/getUserId";
import { useQuery } from "@apollo/client";

export default function MenuBar(){
  const { data : session } = useSession();
  const [userId, setUserId] = useRecoilState(userIdAtom);
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    {
      name: "Profile",
      link: "/home/profile",
      icon: <FaUserAlt />
    },
    {
      name: "Friends",
      link: "/home/friends",
      icon: <MdPeopleAlt  />
    },
    {
      name: "Requests",
      link: "/home/requests",
      icon: <FaEnvelope  />
    },
    {
      name: "Chats",
      link: "/home/chats",
      icon: <IoMdChatbubbles />
    },
    {
      name: "Search",
      link: "/home/search",
      icon: <FaSearch />
    },
    {
      name: "Home",
      link: "/home",
      icon: <RiHome2Fill />
    },
    {
      name: "Notifications",
      link: "/home/notifications",
      icon: <IoNotificationsSharp />
    },
    {
      name: "Settings",
      link: "/home/settings",
      icon: <BsGearFill />
    },
    // Add more menu items as needed
  ];
  const {data, loading, error} = useQuery(GET_USER_ID,{
    variables:{
      email:session?.user.email
    },
    onCompleted:(dataX)=>setUserId(dataX.getUserId)
  });
  return(
      <div className="flex h-full w-full border-r border-gray-500/50 ">
      <div className="flex flex-col justify-between items-center md:items-start py-2 md:py-4 w-full h-full">
        <Link href="/home">
          <h1 className="font-black font-kanit tracking-tighter text-4xl px-2 md:px-4 underline hover:cursor-pointer hover:bg-gradient-to-b from-zinc-300 to-zinc-900 hover:text-transparent hover:bg-clip-text hover:animate-pulse">P<span className="font-black text-4xl hidden md:inline-block">rate</span></h1>
        </Link>

        <div className="flex flex-col justify-center w-full">
        {menuItems.map((link,index)=>(
          <Button key={link.name} variant={link.link === pathname ? "":"ghost"} onClick={()=> router.push(link.link,{ scroll: false })} className="rounded-none py-6 w-full">
            <span className="flex flex-row md:gap-3 justify-center md:justify-start items-center w-full">
            <h2 className="text-2xl">{link.icon}</h2>
            <h2 className="hidden md:flex text-xl lg:text-2xl">{link.name}</h2>
            </span>
          </Button>
        ))}
        </div>

        <div className="flex flex-col items-center md:items-start gap-2 w-full">
          <Separator orientation="horizontal" />
            <div className="flex flex-row gap-2 md:pl-2">
              <Avatar>
                <AvatarImage src={session?.user.image} />
                  <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="hidden md:flex flex-col w-full py-1 md:px-2">
                <h5 className="text-sm">{session?.user.name}</h5>
                <p className="text-xs opacity-70">{session?.user.email}</p>
              </span>
            </div>
          
          <Separator orientation="horizontal" />
          
          <span className="flex flex-col md:flex-row w-full items-center justify-center md:justify-start md:pl-2 gap-2">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <BiDotsVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={()=>signOut()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>

            </DropdownMenu>
            <ModeToggle />
          </span>
        
        </div>
      </div>
        </div>

  )
}