"use client"
import { usePaginatedQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { Button } from '../../ui/button'
import { Id } from '../../../../convex/_generated/dataModel'
import { ChatListUI } from '@/components/shared/paginated-chat-list'

const UserWebsiteChatMessageList = (
  {
    chat_id
  }:
  {chat_id:Id<"personal_chat">}
) => {
    const {loadMore,isLoading,results,status} = usePaginatedQuery(api.website.client.GetUserWebsitePersonalChatMessagesPaginated.default,{
       chat_id,
       

    },{initialNumItems:10})
   return (
    <div>
          {status==="CanLoadMore" &&
      <Button
      disabled={isLoading}
      onClick={()=>loadMore(10)}
      >
        Load more
      </Button>
      }
      <ChatListUI
      canLoadMore={status==="CanLoadMore"}
      isLoading={isLoading}
      loadMore={()=>loadMore(5)}
      messages={results}

      />
    
    </div>
  )
}

export default UserWebsiteChatMessageList
