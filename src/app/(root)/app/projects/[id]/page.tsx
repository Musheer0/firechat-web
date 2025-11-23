import SendProjectChatMessageInput from '@/components/chat/project/send-project-chat-input'
import React from 'react'
import { Id } from '../../../../../../convex/_generated/dataModel'
import UserProjectChatMessageList from '@/components/chat/project/user-project-chat-message-list'
import ProjectProvider from '@/components/project/project-provider'
import ProjectHeader from '@/components/project/project-header'

const page = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
  return (
  <ProjectProvider id={id as Id<"project">}>
      <div className='w-full flex-1 h-full p-4 flex flex-col'>
        <ProjectHeader/>
      <div className="messages w-full flex-1 overflow-auto">
      <UserProjectChatMessageList projectId={id as Id<"project"> }/>
      </div>
      <SendProjectChatMessageInput id={id as Id<"project">}/>
    </div>
  </ProjectProvider>
  )
}

export default page
