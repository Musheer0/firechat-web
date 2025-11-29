"use client"
import React from 'react'
import { Id } from '../../../../convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import Link from 'next/link'

const ProjectWebsiteListComponent = ({ id }: { id: Id<"project"> }) => {
  const websites = useQuery(api.project.client.ListProjectWebsites.default, {
    project_id: id
  });

  if (websites === undefined)
    return <div>Loading...</div>;

  if (!websites)
    return <div>Not found</div>;

  return (
    <div>
      {websites.map((w) => (
        <React.Fragment key={w._id}>
         <Link href={'/websites/'+w._id+"/chats"}>
          <div className='w-full flex cursor-pointer items-center gap-2'>
            <img src={w.faviconUrl} alt='website icon'/>
            <p className='line-clamp-1'>{w.name}</p>
          </div> 
         </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

// wrap ONLY AFTER defining component
export default React.memo(ProjectWebsiteListComponent);
