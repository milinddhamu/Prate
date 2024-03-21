"use client"
import IndexPage from "@/components/index-page";
import {useState,useEffect} from 'react';
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";

export default function Page() {
  const router = useRouter()
  const {data:session,status} = useSession();

  // useEffect(()=>{
  //   if(session?.user){
  //     router.push("/home");
  //   };
  // },[session]);

  return (
    <IndexPage />
  );
}
