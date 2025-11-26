"use client"

import { FolderPlus } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CreateProjectButton from "./create-project-button"

interface NoProjectsScreenProps {
  onCreate?: () => void
}

export default function NoProjectsScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <Card className="max-w-lg w-full text-center py-10 border-dashed border-2">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <FolderPlus className="w-12 h-12 text-muted-foreground" />
          </div>

          <CardTitle className="text-xl">
            No Projects Yet
          </CardTitle>

          <CardDescription className="text-sm">
            Dawg… your project list is emptier than my sleep schedule.  
            Go make something cool.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
       <CreateProjectButton>
           <Button 
          variant={"custom"}
            className="mt-2"
          >
            Create Project
          </Button>
       </CreateProjectButton>
        </CardContent>
      </Card>
    </div>
  )
}
