"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { TiUserDelete } from "react-icons/ti";
import CreateChatButton from "./open-chat"
export function FriendsCard({
    name,
    image, 
    email,
    id
  }){
  return (
    <Card className="flex flex-row w-full items-center rounded-none relative">
      <div className="flex flex-row gap-4 justify-center items-center h-full w-full p-6">
        <Avatar>
          <AvatarImage src={image} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>
        <h1 className="font-bold">{name}</h1>
        <Badge variant="outline" className="max-w-min">{email}</Badge>
        </span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col justify-center items-center gap-2 w-full max-w-fit px-2">
        <CreateChatButton friendId={id} />
        <Button size="icon" variant="destructive" className="rounded-none">
          <TiUserDelete className="text-lg" />
        </Button>
      </div>
    </Card>
  )
}
