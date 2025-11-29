"use client"
import React from 'react'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { usePaginatedQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'
import { Button } from '../ui/button'
import { Loader, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const WebsiteChatSidebar = ({id}:{id:Id<"website">}) => {
  const {results,isLoading,loadMore,status} = usePaginatedQuery(api.website.client.GetUserWebsitePersonalChatPaginated.default,{
    website_id:id
  },{initialNumItems:5});
  const pathname =usePathname();
  return (
    <SidebarGroup className='flex-1  overflow-y-auto'>
        <SidebarGroupLabel>
            Chats
        </SidebarGroupLabel>
      <SidebarGroupContent>
          <SidebarMenu>
            {results.map((e)=>{
                const isActive = pathname.includes('/chats/'+e._id)
                return (
                    <React.Fragment key={e._id}>
                      <Link
                      href={`/app/websites/${id}/chats/${e._id}`}
                      >
                        <SidebarMenuButton
                         tooltip={e.name}
                        className={cn(
                            'flex hover:bg-muted-foreground/10 rounded-lg px-2 py-2 cursor-pointer items-center',
                            isActive && 'bg-muted-foreground/20'
                        )}>
                            <p className='line-clamp-1 text-s text-muted-foreground'>
                                {e.name}
                            </p>
                           
                        </SidebarMenuButton>
                      </Link>
                    </React.Fragment>
                )
            })}
            {isLoading && <div className='w-full flex items-center justify-center p-2'>
                <Loader className='animate-spin text-muted-foreground' size={14}/></div>}
            {status==="CanLoadMore" && <Button disabled={isLoading} onClick={()=>loadMore(5)} variant={"csecondary"} size={"sm"}>Load more</Button>}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default WebsiteChatSidebar
