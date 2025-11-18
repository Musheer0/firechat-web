
"use client"
import React, { useCallback, useState, useTransition } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Globe } from "lucide-react"
import { useAction } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { cn } from "@/lib/utils"

const AddWebsiteButton = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const saveWebsite = useAction(api.website.client.SaveWebsite.default)

  const handleSave = useCallback(() => {
  setError(null)
  startTransition(async () => {
    try {
      if (!url.trim()) {
        setError("Url is required")
        return
      }

      await saveWebsite({ url })
      setUrl("")
      setOpen(false)
    } catch (err: any) {
      if (err instanceof TypeError) {
        setError("Invalid URL. Please check and try again.")
      } else {
        console.log({err})
        setError(err?.message || "Something went wrong. Try again later.")
      }
    }
  })
}, [url, saveWebsite])


  return (
    <Dialog open={open} onOpenChange={(val) => !isPending && setOpen(val)}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className={cn(
          "sm:max-w-md transition-all duration-300",
          isPending ? "opacity-70 pointer-events-none" : "opacity-100"
        )}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Add Website
          </DialogTitle>
          <DialogDescription>
            Add a website URL. We&apos;ll scrape and store its content for later use.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-4">
          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
            }}
            disabled={isPending}
            className={cn(
              error ? "border-destructive focus-visible:ring-destructive" : ""
            )}
          />
          {error && (
            <p className="text-sm text-destructive animate-fade-in">
              {error}
            </p>
          )}
        </div>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button
              variant="cdanger"
              disabled={isPending}
              className="transition-all"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
          variant={"custom"}
            onClick={handleSave}
            disabled={isPending || !url.trim()}
            className={cn(
              "transition-all flex items-center gap-2",
              isPending && "cursor-not-allowed opacity-75"
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" /> Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddWebsiteButton
