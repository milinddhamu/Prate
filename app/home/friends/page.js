"use client"
import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "@/graphql/queries/getFriends";
import { useRecoilValue } from "recoil";
import {userIdAtom} from "@/atoms/userIdAtom";
import { useEffect } from "react";
import { FriendsCard } from "@/components/friends-card";
import Loading from "@/components/skeleton";
import { useRouter } from "next/navigation"

const Page = () => {
  const userId = useRecoilValue(userIdAtom);
  const {data,loading,error} = useQuery(GET_FRIENDS,{
    variables:{
      userId:userId
    }
  });
  const router = useRouter();
  if(loading) return <Loading />;
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full p-2 gap-2">
        { (data && data?.getFriends) && (
            data.getFriends.map((friend,index)=>(
              <span key={`${friend._id}-FriendList`}>
              <FriendsCard id={friend._id} name={friend.name} email={friend.email} image={friend.image} />
              </span>
              ))
              )
            }
      </div>
    </div>
  )
};

export default Page;