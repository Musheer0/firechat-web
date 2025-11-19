import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import { ChatAddIcon } from '@hugeicons/core-free-icons';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { Id } from '../../../convex/_generated/dataModel';
import Link from 'next/link';
import { Trash2Icon } from 'lucide-react';
import DeleteWebsiteButton from './delete-website';
type website = {
     _id: Id<"website">;
    _creationTime: number;
    rag_entry_id?: string | undefined;
    name: string;
    url: string;
    description: string;
    faviconUrl: string;
    ogBannerUrl: string;
    user_id: string;
}
const UserWebsiteCard = ({e}:{e:website}) => {
  return (
    <Card className='w-full max-w-sm p-0 overflow-hidden gap-2 pb-2'>
            <CardHeader className='p-0 relative'>
                <DeleteWebsiteButton id={e._id}>
                    <Button variant={'ghost'} className='absolute top-3 right-2 cursor-pointer text-destructive' size={'icon'}>
                    <Trash2Icon/>
                </Button>
                </DeleteWebsiteButton>
              <img src={e.ogBannerUrl} alt="website banner url" className='w-full h-[180px] object-cover' />
            </CardHeader>
            <CardContent className='flex py-0 items-center gap-2 '>
              <img src={e.faviconUrl} alt="website favicon" width={40} height={40} />
              <p className='line-clamp-1'>{e.name}</p>
              <Link href={'/app/websites/'+e._id+"/chats"} className='ml-auto'>
                <Button title='new chat'  size={'icon'} variant={'csecondary'}>
                  <HugeiconsIcon
      icon={ChatAddIcon}
      size={24}
      color="currentColor"
      strokeWidth={1.5}
    />

              </Button>
              </Link>
            </CardContent>
            <CardFooter className='pt-0'>
              <CardDescription className='line-clamp-3'>
                {e.description}
              </CardDescription>
            </CardFooter>
           </Card>
  )
}

export default UserWebsiteCard
