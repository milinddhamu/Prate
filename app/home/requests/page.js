"use client"
import { IncomingRequestCard } from "@/components/incoming-request-card";
import { useQuery, useMutation } from "@apollo/client";
import { GET_REQUESTS } from "@/graphql/queries/getRequests";
import { userIdAtom } from "@/atoms/userIdAtom";
import { useEffect } from "react";
import Loading from "@/components/skeleton";
import { useRecoilValue } from "recoil";
import { ACCEPT_FRIEND_REQUEST } from "@/graphql/mutations/acceptFriendRequest";
import { DELETE_FRIEND_REQUEST } from '@/graphql/mutations/deleteFriendRequest';
import Link from "next/link";

const Page = () => {
  const userId = useRecoilValue(userIdAtom);
  const {data, loading, error, refetch} = useQuery(GET_REQUESTS,{
    variables:{
      userId:userId
    }
  });
  const [deleteFriendRequest] = useMutation(DELETE_FRIEND_REQUEST);
  const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
  const handleAcceptFriendRequest = ({requestId}) => {
    acceptFriendRequest({
      variables:{
        userId:userId,
        requestId:requestId
      },
      onCompleted:()=>refetch()
    })
  };
  const handleDeleteFriendRequest = ({requestId}) => {
    deleteFriendRequest({
      variables:{
        userId:userId,
        requestId:requestId
      },
      onCompleted:()=>refetch()
    })
  };
  const REQUESTS_ARRAY = data?.getRequests;
  if(loading) return <Loading />
  if(error) return `Error:${error}`

  return (
    <div className="w-full">

    <div className="grid grid-cols-1 lg:grid-cols-2 w-full p-2 gap-2 relative">
      {
        REQUESTS_ARRAY && 
          REQUESTS_ARRAY?.length === 0 ? 
            <div className="flex flex-col w-full justify-center items-center h-dvh max-h-dvh lg:col-span-2">
              <h1 className="text-lg">No Requests found.</h1>
              <p>Add new friends from <Link className="underline" href="/home/search">here.</Link></p>
            </div> :
              <>
                {REQUESTS_ARRAY?.map((request,index) => (
                    <IncomingRequestCard request={request} key={`${request._id}-Request-${index}`} handleAcceptFriendRequest={handleAcceptFriendRequest} handleDeleteFriendRequest={handleDeleteFriendRequest} />
                    ))}
              </>
      }
        </div>
      </div>
  );
};

export default Page;
