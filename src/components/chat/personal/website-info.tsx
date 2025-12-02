"use client"
import React from "react"
import { Id } from "../../../../convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"

const WebsiteInfo = ({ id }: { id: Id<"website"> }) => {
  const websiteInfo = useQuery(api.website.client.QueryUserWebsite.default, {
    website_id: id,
  })

  const websiteTranscribe = useQuery(
    api.website.client.QueryUserWebsite.getTranscribeDb,
    { website_id: id }
  )

  // ----------------------
  // LOADING UI
  // ----------------------
  if (websiteInfo === undefined) {
    return (
      <Card className="w-full max-w-md p-3 space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-48 h-3" />
          </div>
        </div>

        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-10" />
      </Card>
    )
  }

  // ----------------------
  // NOT FOUND UI
  // ----------------------
  if (!websiteInfo) {
    return (
      <Card className="w-full max-w-md p-6 text-center space-y-3">
        <h2 className="text-xl font-semibold">Website Not Found 💀</h2>
        <p className="text-muted-foreground text-sm">
          Bro I swear this website does not exist. Check the ID again.
        </p>
      </Card>
    )
  }

  // Normal UI below
  return (
    <Card className="w-full max-w-md bg-card border rounded-xl shadow p-3">
      <CardHeader className="flex flex-row items-center gap-3">
        <img
          src={websiteInfo.faviconUrl}
          alt="favicon"
          className="w-10 h-10 rounded-md"
        />

        <div>
          <CardTitle className="text-lg">{websiteInfo.name}</CardTitle>
          <CardDescription>{websiteInfo.url}</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {websiteInfo.description}
        </p>
      </CardContent>

      <CardFooter>
        {websiteTranscribe === undefined ? (
          // LOADING TRANSCRIPT BUTTON STATE
          <Skeleton className="w-full h-10" />
        ) : websiteTranscribe ? (
          // ----------------------
          // TRANSCRIPT UI
          // ----------------------
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Show Transcript</Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl w-fit max-h-[80vh] overflow-y-auto">
              <DialogHeader className="">
                <DialogTitle>Transcript</DialogTitle>
              </DialogHeader>

              <div className="space-y-3 w-full overflow-x-auto">
             
                {/* Transcript text */}
                <div className="bg-muted p-3 rounded-md text-sm whitespace-break-spaces ">
                  {websiteTranscribe.transcript ||"no"}
                </div>

                {/* Links */}
                {websiteTranscribe.link?.length > 0 && (
                  <div>
                    <strong>Links Found:</strong>
                    <ul className="list-disc ml-5 text-sm">
                      {websiteTranscribe.link.map((link, i) => (
                        <li key={i}>
                          <a
                            href={link}
                            className="text-blue-500 underline"
                            target="_blank"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Images */}
                {websiteTranscribe.images?.length > 0 && (
                  <div>
                    <strong>Images:</strong>
                    <div className="flex flex-wrap gap-2 w-full mt-2">
                      {websiteTranscribe.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`img-${i}`}
                          className="rounded-md w-full max-w-[300px] mah-h-[300px] object-contain border"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          // ----------------------
          // NO TRANSCRIPT FOUND
          // ----------------------
          <Button disabled className="w-full">
            Transcript Not Found 💀
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default WebsiteInfo
