"use client"
import { Sidebar  ,SidebarFooter,SidebarGroup, SidebarGroupContent,SidebarTrigger } from '@/components/ui/sidebar'
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeftDoubleIcon } from '@hugeicons/core-free-icons';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';
import GeneralMenus from './general-menus';
import { UserButton } from '@clerk/nextjs';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import WebsiteChatSidebar from './website-chats-sidebar';
import { Id } from '../../../convex/_generated/dataModel';

export default function MainSidebar()
 {
  const router = useRouter()
  const param =useParams()
  const  handleSubmit = (e:string)=>{
    router.push('/app/websites?q='+e);
  }
  return(
  <Sidebar className='border-none py-2' collapsible='icon'>
     <SidebarGroup>
         <SidebarGroupContent className='flex items-center group-data-[collapsible=icon]:justify-center justify-between'>
             <img
        src='/logo.svg'
        width={25}
        height={25}
        alt='logo'
        className='group-data-[collapsible=icon]:hidden'
        about='logo of the website'
        />
        <SidebarTrigger/>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
           <div className='relative w-full group-data-[collapsible=icon]:hidden'>
             <SearchIcon size={15} className='absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground'/>
             <Input
             onKeyDown={(e)=>{
              if(e.key==="Enter"){
                handleSubmit(e.currentTarget.value)
              }
             }}
            style={{
              boxShadow:`
               0px 0.5px 0px rgb(47 47 47),
                0px 5px  4px rgb(0,0,0,0.1) inset
              `
            }}
            placeholder='Search Websites'
            className='bg-zinc-950/40!  items-start border-none pl-7 '/>
           </div>
          </SidebarGroupContent>
        </SidebarGroup> 
        <GeneralMenus/>
        {!param.id && <div className='flex-1'/>}
      {param.id && <WebsiteChatSidebar id={param.id as Id<"website">}/>}
        <SidebarFooter>
           <UserButton showName
        appearance={{
          elements:{
            rootBox:' w-full!',
            userButtonBox:'flex-row-reverse! w-full! justify-end!',
            userButtonTrigger:'w-full!'
          }
        }}
         />
        </SidebarFooter>
    </Sidebar>
  )
}
