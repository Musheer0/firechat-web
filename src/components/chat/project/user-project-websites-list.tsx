"use client"
import { usePaginatedQuery, useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Id } from '../../../../convex/_generated/dataModel'

const UserProjectWebsiteList = ({id}:{id:Id<"project">}) => {
     const results = useQuery(api.project.client.ListProjectWebsites.default,{project_id:id})
     if(results===undefined)
      return (
        <div>Loading</div>
      )
      if(results===null)
        return (
          <div>
            Not found
          </div>
          )
   return (
    <div>
     
      {JSON.stringify(results)}
    
    </div>
  )
}

export default UserProjectWebsiteList
