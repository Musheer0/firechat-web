"use client"
import { usePaginatedQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { Button } from '../../ui/button'
import { Id } from '../../../../convex/_generated/dataModel'

const UserWebsiteChatList = (
  {
    website_id
  }:
  {website_id:Id<"website">}
) => {
    const {loadMore,isLoading,results,status} = usePaginatedQuery(api.website.client.GetUserWebsitePersonalChatPaginated.default,{
      website_id
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
      {JSON.stringify(results)}
    
    </div>
  )
}

export default UserWebsiteChatList
