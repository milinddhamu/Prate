import Image from "next/image";
import { Card } from "./ui/card";
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';
import LoginButtons from '@/components/login-buttons';
import { ModeToggle } from './theme-mode-toggle';

const IndexPage = () => {
  const date = new Date();
  const CurrentYear = date.getFullYear().toString();
  return (
    <>
    <div className="relative flex flex-col items-center justify-center w-full h-screen max-h-screen">
      <div className="flex flex-col lg:flex-row items-center lg:justify-between max-w-screen-lg w-full justify-evenly h-full gap-2">
        <div className="">
        <h1 className="text-7xl lg:text-9xl font-kanit font-black tracking-tighter">Prate</h1>
        <h2 className="text-2xl lg:text-3xl opacity-70 pl-1">/preɪt/</h2>
        <p className="opacity-70 italic">&quot;talk foolishly or at tedious length about something.&quot;</p>
        </div>
        
        <Card className="w-[400px] p-6 flex flex-col gap-2 rounded-none">
          <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-zinc-700 to-zinc-400">Join now.</h3>
          <Separator orientation="horizontal" className="my-3" />
          <LoginButtons />
          <p className="text-gray-500 text-xs text-justify">
          &quot;By signing up, you acknowledge and consent to providing your email and related information for the purpose of using this service.&quot;
          </p>

        </Card>
      </div>
    </div>
      <div className="absolute flex justify-center items-center bottom-0 w-full p-6">
        <div className="relative flex flex-row w-full justify-center gap-1 max-w-screen-lg">
          <div className="absolute left-0 top-0">
            <ModeToggle />
          </div>
      <Badge size="xs">©{CurrentYear}</Badge>
      <Badge>@milinddhamu</Badge>
        </div>
      </div>
  </>
  );
}

export default IndexPage;