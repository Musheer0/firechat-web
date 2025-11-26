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
import { Loader2, Globe, MessageCircle } from "lucide-react"
import {  useAction, useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { cn } from "@/lib/utils"
import { Id } from "../../../../convex/_generated/dataModel"
import { useRouter } from "next/navigation"

const DeleteProjectButton
 = ({ children ,id}: { children: React.ReactNode,id:Id<"project"> }) => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const DeleteWebsite = useAction(api.project.client.DeleteProject.default)
 const router = useRouter()
  const handleDelete = useCallback( () => {
    setError(null)
    startTransition(async () => {
      try {

        setError("")
        await DeleteWebsite({project_id:id })
        router.push('/app/projects')
        setOpen(false)
      } catch (err: any) {
        if (err instanceof TypeError) {
          setError("Invalid URL. Please check and try again.")
        } else {
          setError(err?.message || "Something went wrong. Try again later.")
        }
      }
    })
  },[])

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
            <MessageCircle className="w-5 h-5 text-primary" />
            Delete Project
          </DialogTitle>
          <DialogDescription>
            Warning this will delete Project permanently no backup 
          </DialogDescription>
        </DialogHeader>
   {error && (
            <p className="text-sm text-destructive animate-fade-in">
              {error}
            </p>
          )}

        <DialogFooter className="flex gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isPending}
              className="transition-all"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
          variant={'destructive'}
            onClick={handleDelete}
            disabled={isPending}
            className={cn(
              "transition-all flex items-center gap-2",
              isPending && "cursor-not-allowed opacity-75"
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteProjectButton

