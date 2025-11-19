"use client"
import { usePaginatedQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { Button } from '../../ui/button'
import { Id } from '../../../../convex/_generated/dataModel'
import { cn } from '@/lib/utils'

const UserProjectChatMessageList = (
  {
    projectId
  }:
  {projectId:Id<"project">}
) => {
    const {loadMore,isLoading,results,status} = usePaginatedQuery(api.project.client.getUserProjectMessages.default,{
       projectId,
       

    },{initialNumItems:10})
   return (
    <div className='flex flex-col gap-2 overflow-auto'>
          {status==="CanLoadMore" &&
      <Button
      disabled={isLoading}
      onClick={()=>loadMore(10)}
      >
        Load more
      </Button>
      }
     {results.map((e)=>{
      return (
        <React.Fragment key={e._id}>
          <div 
           style={{
              boxShadow:`
               0px 0.5px 0px rgb(47 47 47),
                0px 5px  4px rgb(0,0,0,0.1) inset
              `
            }}
          className={cn(
            "p-4  w-fit max-w-[90%] rounded-2xl ",
            e.role==="user" ? "bg-sidebar-primary/50 rounded-br-none border ml-auto":"bg-primary rounded-bl-none",
          )}>
            {e.content}
            {e.pending && 'r'}
          </div>
        </React.Fragment>
      )
     })}
    
    </div>
  )
}

export default UserProjectChatMessageList
