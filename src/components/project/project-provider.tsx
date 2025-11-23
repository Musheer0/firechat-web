"use client"
import { Tproject } from "@/types/project-types";
import { createContext, useContext, useState } from "react"
const ProjectContext = createContext<Pick<Tproject,"_id"|"name"|"icon"|"user_id"|"_creationTime">|null>(null);
import React from 'react'
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
const ProjectProvider = ({children, id}:{children:React.ReactNode, id:Id<"project">}) => {
   const project = useQuery(api.project.client.getProjectById.default,{project_id:id})

 if(project===undefined)
    return (
        <>
        Loader
        </>
    )
 if(project==null)
    return <>
    not found
    </>
if(project)
  return (
    <ProjectContext.Provider value={project}>
        {children}
    </ProjectContext.Provider>
  )
};
export default ProjectProvider
export const useProject = ()=>{
    const context = useContext(ProjectContext);
    if(!context) throw new Error("use project context under project context provider");
    return context;
};
