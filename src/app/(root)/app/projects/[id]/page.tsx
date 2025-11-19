import SendProjectChatMessageInput from '@/components/chat/project/send-project-chat-input'
import React from 'react'
import { Id } from '../../../../../../convex/_generated/dataModel'
import UserProjectChatMessageList from '@/components/chat/project/user-project-chat-message-list'

const page = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
  return (
    <div className='w-full flex-1 h-full p-4 flex flex-col'>
      <div className="heade w-full py-2">
        <p>
          Project Name
          
        </p>
      </div>
      <div className="messages w-full flex-1 overflow-auto">
      <UserProjectChatMessageList projectId={id as Id<"project"> }/>
      </div>
      <SendProjectChatMessageInput id={id as Id<"project">}/>
    </div>
  )
}

export default page
