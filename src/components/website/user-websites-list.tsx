"use client"
import { usePaginatedQuery } from 'convex/react'
import React, { useEffect } from 'react'
import { api } from '../../../convex/_generated/api'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '../ui/card'
import UserWebsiteCard from './user-website-card'
import { Skeleton } from '../ui/skeleton'
import NoWebsitesScreen from './no-websites-screen'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const UserWebsiteList = () => {
    const {loadMore,isLoading,results,status} = usePaginatedQuery(api.website.client.GetUserWebsitesPaginated.default,{},{initialNumItems:10})
    const searchparams = useSearchParams()
    const query = searchparams.get('q');
    const router =useRouter()
   return (
    <div>
          {!isLoading &&  results.length==0 && <NoWebsitesScreen/>}
       {query &&
        <div className='w-full py-2 flex items-center gap-2'>
           <CardDescription>
          showing results for "<i>{query}</i>"
         </CardDescription>
          <Button
          size={'sm'}
          variant={"csecondary"}
          onClick={()=>router.push('/app/websites')}
          >
            Clear
          </Button>
        </div>
       }
    <div className='flex w-full h-full flex-wrap-reverse flex-1 gap-3'>
        {results.map((e)=>{
          if(query){
             if(e.description.toLocaleLowerCase().includes(query.toLocaleLowerCase())||e.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))     return (
          <React.Fragment key={e._id}>
          <UserWebsiteCard e={e}/>
           </React.Fragment>
        )
          }
          else
        return (
          <React.Fragment key={e._id}>
          <UserWebsiteCard e={e}/>
           </React.Fragment>
        )
      })}
        {isLoading &&
      <>
      {[1,2,3,4,5,6].map((e)=>{
        return (
          <React.Fragment key={e}>
            <Skeleton className='w-full max-w-sm h-[250px]'>
              
            </Skeleton>
          </React.Fragment>
        )
      })}
      </>
      }
    </div>
    
        <div className='w-full flex items-center justify-center py-2'>
            {status==="CanLoadMore" &&
      <Button
      variant={'custom'}
      disabled={isLoading} 
      className='mx-auto'
      onClick={()=>loadMore(10)}
      >
        Load more
      </Button>
      }
        </div>
     
    
    </div>
  )
}

export default UserWebsiteList
