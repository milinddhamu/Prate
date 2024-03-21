"use client"
import { Button } from "@/components/ui/button";
import { redirect } from 'next/navigation';
import Loading from "@/components/skeleton";
import { useMutation } from "@apollo/client";
import { UPSERT_USER } from "@/graphql/mutations/upsertUser";
import { useEffect } from 'react';
import { useSession } from "next-auth/react"
import { useRecoilState } from 'recoil';
import {userIdAtom} from "@/atoms/userIdAtom";
import {signOut} from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Page(){
  const { data: session, status } = useSession();
  const [upsertUser, { data, loading, error }] = useMutation(UPSERT_USER);
  const router = useRouter();
  const [userId, setUserId] = useRecoilState(userIdAtom);
  useEffect(() => {
    if(userId){
      console.log("already signed In")
      return;
    }
    if (status === 'authenticated') {
      upsertUser({ 
        variables: { 
          "input":{ 
            "email": session.user.email, 
            "image": session.user.image,
            "name":session.user.name
          }
        },
        onCompleted:(data)=> {
          setUserId(data.upsertUser._id);
        },
        onError:()=>{
          signOut()
        }
      })
    }
  }, [status, session]);
  if (error) return `Submission error! ${error.message}`;
  return (
    <div className="flex w-full h-full justify-center items-center">
      { loading ? <Loading /> : 
      data?.upsertUser &&
      <span className="text-sm md:text-xl">Add friends or Start Messaging from 
        <Button variant="link" className="p-0 pl-2 text-sm md:text-xl" onClick={()=> router.push("/home/friends")}>here↗ </Button>.
      </span> 
      }
    </div>
  );
};