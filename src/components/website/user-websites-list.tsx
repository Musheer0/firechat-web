"use client"
import { usePaginatedQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../convex/_generated/api'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '../ui/card'

const UserWebsiteList = () => {
    const {loadMore,isLoading,results,status} = usePaginatedQuery(api.website.client.GetUserWebsitesPaginated.default,{},{initialNumItems:10})
   return (
    <div>
    <div className='flex w-full h-full flex-1 gap-3'>
        {results.map((e)=>{
        return (
          <React.Fragment key={e._id}>
           <Card className='w-full max-w-sm p-0 overflow-hidden gap-2 pb-2'>
            <CardHeader className='p-0'>
              <img src={e.ogBannerUrl} alt="website banner url" className='w-full h-[180px] object-cover' />
            </CardHeader>
            <CardContent className='flex py-0 items-center gap-2 '>
              <img src={e.faviconUrl} alt="website favicon" width={40} height={40} />
              <p className='line-clamp-1'>{e.name}</p>
              
            </CardContent>
            <CardFooter className='pt-0'>
              <CardDescription className='line-clamp-3'>
                {e.description}
              </CardDescription>
            </CardFooter>
           </Card>
          </React.Fragment>
        )
      })}
    </div>
          {status==="CanLoadMore" &&
      <Button
      disabled={isLoading}
      onClick={()=>loadMore(10)}
      >
        Load more
      </Button>
      }
     
    
    </div>
  )
}

export default UserWebsiteList
