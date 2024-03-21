"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FaUserCheck,FaUserPlus } from "react-icons/fa";
import { useRouter } from "next/navigation"

export function ProfileSearchCard({
    name,
    image, 
    email, 
    isFriend, 
    isRequestSent,
    hasIncomingRequest,
    searchedUserId,
    currentUserId, 
    handleSendFriendRequest
  }){
  const router = useRouter();
  const handleSubmit = () => handleSendFriendRequest({
    currentUserId,
    searchedUserId
  });

  return (
    <Card className="flex flex-col w-full justify-center items-center rounded-none relative">
      <div className="flex flex-row gap-4 justify-center items-center h-full py-6">
        <Avatar>
          <AvatarImage src={image} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>
        <h1 className="font-bold">{name}</h1>
        {email && <Badge variant="outline">{email}</Badge>}
        </span>
      </div>
      {searchedUserId !== currentUserId && 
        <>
          <Separator orientation="horizontal" />
          <span className="flex w-full justify-center gap-2 py-2">
          {!hasIncomingRequest ? 
            <Button size="sm" className="gap-2" disabled={isRequestSent || isFriend} onClick={handleSubmit}>
              {isFriend ? <><FaUserCheck /> Friends</>
                : isRequestSent ? <><FaUserCheck /> Request sent</>
                : <><FaUserPlus /> Add friend</>
                }
            </Button>
           : 
            <Button size="sm" onClick={()=> router.push("/home/requests",{ scroll: false })}>
              view request ↗
            </Button>}
          </span>
        </>
      }
    </Card>
  )
}
