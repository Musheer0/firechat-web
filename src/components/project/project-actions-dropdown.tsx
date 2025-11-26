"use client"
import { Button } from '../ui/button';
import { Globe2Icon, MoreVertical, Trash2Icon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import ProjectWebsiteList from '../chat/project/project-website-list';
import DeleteProjectButton from '../chat/project/delete-project';
import { Id } from '../../../convex/_generated/dataModel';
const ProjectActionsDropDown = ({id}:{id:Id<"project">}) => {
  return (
     <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant={"ghost"}>
            <MoreVertical/>
        </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='left'>
             <DeleteProjectButton id={id}>
                
                   <DropdownMenuItem  asChild   onSelect={(e) => e.preventDefault()}>
                       <button className="flex w-full items-center py-3 gap-2">
                            <Trash2Icon/>
                    <DropdownMenuLabel>
                        Delete Project
                    </DropdownMenuLabel>
                        </button>
                

                </DropdownMenuItem>
             </DeleteProjectButton>
               <Sheet>
                   <DropdownMenuItem asChild   onSelect={(e) => e.preventDefault()}>
                <SheetTrigger
                asChild
                >
                    <button className="flex w-full items-center py-3 gap-2">
      <Globe2Icon />
      Connected Websites
    </button>

                </SheetTrigger>
                </DropdownMenuItem>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            Linked Wesbites
                        </SheetTitle>
                    </SheetHeader>
                   <ProjectWebsiteList id={id}/>
                </SheetContent>
               </Sheet>
            </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default ProjectActionsDropDown
