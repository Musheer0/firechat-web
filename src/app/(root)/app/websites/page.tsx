import { Button } from '@/components/ui/button'
import AddWebsiteButton from '@/components/website/add-website-button'
import UserWebsiteList from '@/components/website/user-websites-list'
import { PlusCircleIcon } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-full flex flex-col overflow-y-auto gap-2 p-4'>
      <div className="header sticky top-0 bg-sidebar-accent py-2 z-50 px-2 w-full flex items-center justify-between">
        <p className='text-xl font-semibold'>Your Websites</p>
       <AddWebsiteButton>
         <Button variant={'custom'} size={'sm'}>
            <PlusCircleIcon/>
            Add Website
        </Button>
       </AddWebsiteButton>
      </div>
      <UserWebsiteList/>
    </div>
  )
}

export default page
