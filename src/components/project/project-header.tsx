"use client"
import React from 'react'
import { useProject } from './project-provider'
import { HugeiconsIcon } from "@hugeicons/react";
import { PackageIcon } from "@hugeicons/core-free-icons";
import { Button } from '../ui/button';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';
const ProjectHeader = () => {
    const project = useProject()
if(project)
  return (
         <div className="heade flex items-center justify-between w-full py-2">
        <div className="left flex items-center px-2 gap2">
                   <HugeiconsIcon
                              icon={PackageIcon}
                              size={26}
                              color="white"
                              strokeWidth={1.5}
                            />
        <p>
         {project.name}
        </p>
        </div>

        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant={"ghost"}>
            <MoreVertical/>
        </Button>
            </DropdownMenuTrigger>
        </DropdownMenu>
        </div>
  )
}

export default ProjectHeader
