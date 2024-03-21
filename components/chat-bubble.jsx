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

export function ChatBubble({text,user,time}) {
  const FORMATTED_TIME = new Date(time*1000).toLocaleTimeString()
  return (
    <Card className={`flex flex-col w-5/6 relative p-2 gap-2 rounded-none max-w-fit max-h-fit ${user ? "rounded-br-lg bg-gray-500/20 pl-4":"rounded-bl-lg pr-4"}`}>
      <span className="text-sm md:text-normal whitespace-normal">{text}</span>
      <p className="text-end text-xs opacity-50">{FORMATTED_TIME || ""}</p>
    </Card>
  )
}
