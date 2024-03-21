"use client"
import { CREATE_CHAT } from "@/graphql/mutations/createChat";
import { useMutation } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { userIdAtom } from "@/atoms/userIdAtom";
import { Button } from "./ui/button";
import { IoIosPaperPlane } from "react-icons/io";
import { useRouter } from "next/navigation";

const CreateChatButton = ({friendId}) => {
  const userId = useRecoilValue(userIdAtom);
  const [createChat,{data,loading,error}] = useMutation(CREATE_CHAT);
  const router = useRouter();
  const handleOpenChat = () => {
    createChat({
      variables:{
        userIds:[userId.toString(),friendId.toString()]
      },
      onCompleted:(data)=>router.push(`/home/chats/${data.createChat._id}`)
    })
  };
  return (
    <Button size="icon" onClick={handleOpenChat} className="rounded-none text-lg">
      <IoIosPaperPlane />
    </Button>
  );
}

export default CreateChatButton;