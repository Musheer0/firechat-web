"use client"
import { usePaginatedQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { Button } from '../../ui/button'
import { Id } from '../../../../convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { ChatListUI } from '@/components/shared/paginated-chat-list'

const UserProjectChatMessageList = (
  {
    projectId
  }:
  {projectId:Id<"project">}
) => {
  const { results, loadMore, isLoading, status } = usePaginatedQuery(
  api.project.client.getUserProjectMessages.default,
  { projectId },
  { initialNumItems: 10 }
)

return (
  <ChatListUI
    messages={results}
    loadMore={() => loadMore(10)}
    isLoading={isLoading}
    canLoadMore={status === "CanLoadMore"}
  />
)

}

export default UserProjectChatMessageList
