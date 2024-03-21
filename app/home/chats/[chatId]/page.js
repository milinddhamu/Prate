"use client"
import { ChatBubble } from "@/components/chat-bubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { IoIosArrowBack } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {useRouter} from "next/navigation";
import { IoIosPaperPlane } from "react-icons/io";
import { useRecoilValue } from "recoil";
import { userIdAtom } from "@/atoms/userIdAtom";
import { useLazyQuery, useMutation,useSubscription,useQuery } from "@apollo/client";
import { GET_CHAT } from "@/graphql/queries/getChat";
import { SEND_MESSAGE } from "@/graphql/mutations/sendMessage";
import { useEffect,useState,useRef } from "react";
import { useSession } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton";
import { MESSAGE_ADDED } from "@/graphql/subscription/messageAdded"
import { GrFormRefresh } from "react-icons/gr";

const Page = ({params}) => {
  const chatId = params.chatId;
  const router = useRouter(); 
  const userId = useRecoilValue(userIdAtom);
  const {data:session} = useSession();
  const [endUser, setEndUser] = useState(null);
  const [messages, setMessages] = useState(null);
  const [moreMessagesPresent,setMoreMessagesPresent] = useState(true);
  const [shouldScroll,setShouldScroll] = useState(true);
  const {data,loading,error,fetchMore} = useQuery(GET_CHAT,{
    variables: { 
      input:{
        userId:userId,
        chatId:chatId
      },
      limit: 20,
      offset: 0
    },
    onCompleted: (datax) => {
      if (datax && datax.getChat) { // Ensure datax and getChat exist
        setEndUser(() =>{
          const otherUser = datax.getChat.users.find(user => user.email !== session?.user.email);
          return otherUser
        });
        const messages = datax.getChat.messages; // here its updating this messages array as per limit and offset so storing these messages after prev messages.
        setMessages((alreadyPresentMessages) => [
          ...(alreadyPresentMessages || []), 
          ...(messages || [])
        ]);
      }
    }
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const messagesEndRef = useRef(null);
  const {data:subscription_data, loading:subscription_loading, error:subscription_error} = useSubscription(MESSAGE_ADDED,{
    variables:{
      chatId:chatId,
      userId:userId
    }
  });
  const [messageInput, setMessageInput] = useState("")
  const handleSendMessage = () => {
    sendMessage({
      variables : {
        input:{
          chatId:chatId,
          ownerId:userId,
          text:messageInput
        }
      },
      onCompleted:(e) => {
        setMessageInput("");
      } 
    }).then(()=> scrollToBottom())
  }
  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value)
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadMoreMessages = () => {
    fetchMore({
      variables:{
        offset: messages.length,
      }
    }).then((moreData)=>{
      const upcomingMessages = moreData.data.getChat.messages;
      if(upcomingMessages && upcomingMessages.length !== 0){
        setMessages((prev)=>[...prev,...moreData.data.getChat.messages]);
      } else {
        setMoreMessagesPresent(false);
      }
    }); 
  };
  
  useEffect(() => {
    if (subscription_data) {
      setMessages((prevMessages) => [subscription_data.messageAdded, ...prevMessages]);
    }
  }, [subscription_data]);

  useEffect(()=>{
    if (shouldScroll && messages?.length > 0) {
      scrollToBottom();
      setShouldScroll(false);
    }},[messages,shouldScroll]);
  
  if(loading) return <Skeleton />;
  return (
    <div className="flex flex-col relative w-full" >

      {/* Top sticky header */}
      <div className="sticky top-0 z-10 backdrop-blur flex w-full border-y border-gray-500/50">
        <div className="p-2">
          <Button variant="outline" size="icon" onClick={()=> router.push("/home/chats")}><IoIosArrowBack />
          </Button>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-row gap-2 justify-start items-center w-full px-2">
          <Avatar>
            <AvatarImage src={endUser?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>
            <h1 className="font-bold">{endUser?.name}</h1>
            <p className="text-xs">{endUser?.email}</p>
          </span>
        </div>
      </div>

      {/* mapped messages*/}
      <div className="flex flex-col-reverse w-full h-full pb-2 gap-1 overflow-y-scroll">
        <div ref={messagesEndRef} key="scrollToBottom"/>
        {messages && messages.length !== 0 ?
        <>
          {messages.map((chat, index) => { 
            const IS_END_USER = chat.owner === endUser?._id;
            return (
              <div key={chat._id} className={`flex w-full ${IS_END_USER ? "justify-start" : "justify-end"}`}>
                <ChatBubble text={chat.text} user={IS_END_USER} time={chat.timestamp} />
              </div>
            )})}
          { moreMessagesPresent &&
            <div className="flex w-full justify-center" key="loadingButton">
              <Button 
                size="sm" 
                variant="secondary" 
                className="rounded-tr-none rounded-tl-none gap-2"
                onClick={loadMoreMessages}
                ><GrFormRefresh /> load previous messages</Button>
            </div>
          }   
        </> 
        :
        <div className="flex w-full justify-center items-center">
          Send a new message.
        </div>
        }
      </div>

      {/* bottom input bar*/}
      <div className="sticky bottom-0 flex w-full border-y border-gray-500/50 backdrop-blur-xl">
      <div className="flex flex-row gap-2 justify-between items-center w-full p-2">
          <Textarea 
            placeholder="Type your message here." 
            className="rounded-none"
            value={messageInput}
            onChange={handleMessageInputChange}
            />
          <span className="flex flex-col gap-2">
          <Button size="icon" className="" onClick={handleSendMessage}>
          <IoIosPaperPlane />
          </Button>
          <Button variant="destructive" size="xs" className="text-xs">
          clear
          </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
