"use client"

import { FileSearch } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ProjectNotFoundProps {
  onBack?: () => void
}

export default function Page() {
    const router = useRouter()
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <Card className="w-full max-w-lg text-center py-8 border-dashed border-2">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <FileSearch className="w-12 h-12 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">Project Not Found</CardTitle>
          <CardDescription className="text-sm">
            Bro… the project you're hunting for probably ran away with someone else's database.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Button 
            variant="outline" 
           onClick={()=>{
            router.back()
           }}
            className="mt-2"
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
