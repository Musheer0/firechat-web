"use client"

import { Globe2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AddWebsiteButton from "./add-website-button"



export default function NoWebsitesScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <Card className="max-w-md w-full text-center py-10 border-dashed border-2">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Globe2 className="w-12 h-12 text-muted-foreground" />
          </div>

          <CardTitle className="text-xl">
            No Websites Linked
          </CardTitle>

          <CardDescription className="text-sm">
            Bro… your website list is emptier than a Sunday 8am Discord server.  
            Go hook something up.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center">
       <AddWebsiteButton>
           <Button
          variant={"custom"} 
            className="mt-2"
          >
            Add Website
          </Button>
       </AddWebsiteButton>
        </CardContent>
      </Card>
    </div>
  )
}
