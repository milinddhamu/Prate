"use client"
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
const Page = () => {
  return (
    <div className="flex w-full justify-center p-2">
        <Button variant="destructive" onClick={()=> signOut()}>Log out</Button>
    </div>
  );
}

export default Page;