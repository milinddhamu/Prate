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
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { IoPersonAdd } from "react-icons/io5";

export function IncomingRequestCard({request,handleAcceptFriendRequest,handleDeleteFriendRequest}) {
  const acceptRequest = () => {
    handleAcceptFriendRequest({
      requestId:request._id,
    })
  }
  const deleteRequest = () => {
    handleDeleteFriendRequest({
      requestId:request._id,
    })
  }
  return (
    <Card className="flex flex-col w-full justify-center items-center rounded-none relative">
      <div className="flex flex-row gap-4 justify-center items-center py-6">
        <Avatar>
          <AvatarImage src={request.image} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>
        <h1 className="font-bold">{request.name}</h1>
        {request.email && <Badge variant="outline">{request.email}</Badge>}
        </span>
      </div>
      <Separator orientation="horizontal" />
      <span className="flex w-full justify-center gap-2 py-2">
        <Button size="sm" onClick={acceptRequest}>Accept
        </Button>
        <Button size="sm" onClick={deleteRequest} variant="destructive">Decline
        </Button>
      </span>
      <span className="absolute p-2 left-0 top-0">
      <IoPersonAdd />
      </span>
    </Card>
  )
}
