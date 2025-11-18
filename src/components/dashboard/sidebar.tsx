
import { Sidebar  ,SidebarGroup, SidebarGroupContent,SidebarTrigger } from '@/components/ui/sidebar'
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeftDoubleIcon } from '@hugeicons/core-free-icons';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';
import GeneralMenus from './general-menus';

export default function MainSidebar() {
  return(
  <Sidebar className='border-none py-2' collapsible='icon'>
     <SidebarGroup>
         <SidebarGroupContent className='flex items-center group-data-[collapsible=icon]:justify-center justify-between'>
             <img
        src='../logo.svg'
        width={25}
        height={25}
        alt='logo'
        className='group-data-[collapsible=icon]:hidden'
        about='logo of the website'
        />
        <SidebarTrigger/>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
           <div className='relative w-full group-data-[collapsible=icon]:hidden'>
             <SearchIcon size={15} className='absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground'/>
             <Input
            style={{
              boxShadow:`
               0px 0.5px 0px rgb(47 47 47),
                0px 5px  4px rgb(0,0,0,0.1) inset
              `
            }}
            placeholder='Search Websites'
            className='bg-zinc-950/40!  border-none pl-7 '/>
           </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <GeneralMenus/>
    </Sidebar>
  )
}
