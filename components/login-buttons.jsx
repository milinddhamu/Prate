'use client'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "./ui/button";
import { useSession,signIn } from "next-auth/react";
import { GrFormRefresh } from "react-icons/gr";
import {useState,useEffect} from 'react';
import { useRouter } from "next/navigation"

export default function LoginButtons(){
  const {data:session,status} = useSession();
  const [buttonLoading,setButtonLoading] = useState(false); 
  const handleClick = () => {
    setButtonLoading(true);
    signIn("google",{ callbackUrl:"/home" })
  };
  // const client = useApolloClient();
  // const { data,loading,error } = useQuery(GET_USER_ID, {
  //   variables: { email: 'milind@milind.com' },
  //   onCompleted: (data) => {
  //     // Storing the user ID in local storage
  //     client.writeQuery({
  //       query: gql`
  //         query GetUserId {
  //           userId @client
  //         }
  //       `,
  //       data: {
  //         userId: data.getUserId,
  //       },
  //     });
  //   },
  // });
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;
  return (
      <>
        <Button className="gap-2 mt-3 rounded-none" disabled={status === "loading"} onClick={handleClick}>
        {!buttonLoading ? <><FcGoogle /> Sign up with Google</>:<GrFormRefresh className="animate-spin"/> }
        </Button>
        <Button disabled={true} className="gap-2 rounded-none" >
          <FaGithub /> Sign up with Github
        </Button>
      </>
)}