import CreateProjectButton from '@/components/chat/project/create-project-button'
import UserProjectList from '@/components/chat/project/user-project-list'
import { Button } from '@/components/ui/button'
import AddWebsiteButton from '@/components/website/add-website-button'
import UserWebsiteList from '@/components/website/user-websites-list'
import { PlusCircleIcon } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-full flex flex-col gap-2 p-4'>
      <div className="header px-2 w-full flex items-center justify-between">
        <p className='text-xl font-semibold'>Your Projects</p>
      <CreateProjectButton>
          <Button variant={'custom'} size={'sm'}>
            <PlusCircleIcon/>
            Create Project
        </Button>
      </CreateProjectButton>
      </div>
        <UserProjectList/>
     </div>
  )
}

export default page
