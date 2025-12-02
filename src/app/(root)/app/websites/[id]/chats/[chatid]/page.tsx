import SendChatMessageInput from '@/components/chat/personal/send-chat-input';
import React from 'react'
import { Id } from '../../../../../../../../convex/_generated/dataModel';
import UserWebsiteChatMessageList from '@/components/chat/personal/user-websites-chat-message-list';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe2Icon } from 'lucide-react';
import Link from 'next/link';
import WebsiteInfo from '@/components/chat/personal/website-info';

const page = async({params}:{params:Promise<{id:string,chatid:string}>}) => {
  const {id,chatid} = await params;
  return (
    <div className='flex-1 p-2.5 w-full h-full flex flex-col gap-2'>
      <div className="header flex items-center justify-between  w-full py-2">
        <Link href={'/app/websites/'+id+'/chats'}>
        <Button size={"icon-sm"} variant={"ghost"}>
          <ArrowLeft/>
        </Button>
        </Link>
        <p className='text-xl mr-auto font-semibold'>
          Chat
        </p>
        <Sheet>
          <SheetTrigger asChild>
             <Button size={"icon-sm"} variant={"csecondary"}>
              <Globe2Icon/>
             </Button>
          </SheetTrigger>
          <SheetContent className='p-2'>
            <SheetHeader>
              <SheetTitle>
                Your Currently talking to 
              </SheetTitle>
            </SheetHeader>
          <WebsiteInfo id={id as Id<"website">}/>
          </SheetContent>
        </Sheet>

      </div>
      <div className="flex-1 w-full overflow-y-auto">
        <UserWebsiteChatMessageList chat_id={chatid as Id<"personal_chat">}/>
      </div>
      <SendChatMessageInput id={chatid as Id<"personal_chat">}/>
    </div>
  )
}

export default page
