"use client"
import { RecentChatsCard } from "@/components/recent-chats-card"
import {useRouter} from "next/navigation"
import { useQuery } from "@apollo/client";
import { GET_CHATS } from '@/graphql/queries/getChats'
import { useRecoilValue } from "recoil";
import { userIdAtom } from "@/atoms/userIdAtom";
import { useEffect } from "react";
import { useSession } from "next-auth/react"
import Loading from "@/components/skeleton"


const Page = () => {
  const router = useRouter();
  const userId = useRecoilValue(userIdAtom)
  const { data , error, loading } = useQuery(GET_CHATS,{
    variables:{
      userId:userId
    }
  });
  const {data:session} = useSession();
  // Generate dummy content
  const ChatCards = data?.getChats.map((chat, index) => {
    const user = chat.users.filter((item)=> item.email !== session?.user.email);
    const latestMessage = chat?.messages[0];
    const isSentByUser = latestMessage?.owner._id === userId;
    return (
      <div key={`${chat._id}-${index}`}> 
        <RecentChatsCard user={user[0]} message={latestMessage} isSentByUser={isSentByUser} />
      </div>
    )}
  );

  if(loading) return <Loading />

  return (
    <div className="flex flex-col w-full h-full p-2 gap-2">
      {ChatCards}
    </div>
  );
};

export default Page;
