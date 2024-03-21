import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { IoPersonAdd } from "react-icons/io5";
import { IoMdChatboxes } from "react-icons/io";
import CreateChatButton from "./open-chat";

export function RecentChatsCard({
  user,
  message,
  isSentByUser
  }) {
    console.log(user)
  return (
    <Card className="flex flex-col w-full rounded-none relative py-2 gap-2">
      <div className="flex flex-row justify-between items-center w-full px-2 pr-4">
        <div className="flex flex-row gap-4 justify-start items-center h-full">
          <Avatar>
            <AvatarImage src={user.image} />
              <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>
          <h1 className="font-bold">{user.name}</h1>
          <Badge variant="outline">{user.email}</Badge>
          </span>
        </div>
          <CreateChatButton friendId={user._id}/>
      </div>
      <Separator orientation="horizontal" />
      <span className="flex w-full px-2 gap-2">
        
        {isSentByUser && <Badge id="notification">+1</Badge>}
        
        <Badge id="message" variant="secondary" className="truncate font-normal">{message.text}</Badge>
        </span>
    </Card>
  )
}
