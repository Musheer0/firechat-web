"use client"

import React, { useCallback, useMemo, useState, useTransition } from "react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAction, usePaginatedQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"

const ProjectSelectWebsiteList = ({
  websites,
  onSelect,
  cachedResults,
  loadMore,
  canLoadMore,
  isLoading,
}: {
  websites: Id<"website">[]
  onSelect: (data: Id<"website">[]) => void
  cachedResults: any[]
  loadMore: (count: number) => void
  canLoadMore: boolean
  isLoading: boolean
}) => {
  return (
    <div className="space-y-3">
      <div className="max-h-[250px] overflow-y-auto border rounded-lg p-2 flex flex-col gap-2">
        {cachedResults.map((r) => (
          <div
            key={r._id}
            onClick={() =>
              websites.includes(r._id)
                ? onSelect(websites.filter((w) => w !== r._id))
                : onSelect([...websites, r._id])
            }
            className={cn(
              "flex items-center gap-3 p-3 border rounded-md cursor-pointer transition-all hover:bg-accent",
              websites.includes(r._id) && "border-primary bg-primary/10"
            )}
          >
            <img
              src={r.faviconUrl || "/favicon.ico"}
              alt={r.name}
              className="w-5 h-5 rounded-sm"
            />
            <p className="truncate text-sm font-medium">{r.name}</p>
          </div>
        ))}
      </div>

      {canLoadMore && (
        <Button
          onClick={() => loadMore(10)}
          disabled={isLoading}
          variant="outline"
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading...
            </>
          ) : (
            "Load More"
          )}
        </Button>
      )}
    </div>
  )
}

const ProjectNameStep = ({
  name,
  setName,
}: {
  name: string
  setName: (value: string) => void
}) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        Give your project a name so you can find it later.
      </p>
      <Input
        placeholder="My cool project"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  )
}

type Step = "website" | "name"

const CreateProjectButton = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>("website")
  const [websites, setWebsites] = useState<Id<"website">[]>([])
  const [name, setName] = useState("")
 const ac = useAction(api.project.client.CreateProject.default);
 const [isPending,startTransition] = useTransition();
 const [error ,setError] = useState<string|null>(null)
 const handleClick = useCallback(()=>{
     if (step === "website") {
      if (websites.length === 0) return
      setStep("name")
      return;
    } 
         setError(null);
         startTransition(async()=>{
            try {
                
                const project_id = await ac({
                    name,
                    websites
                });
                console.log(project_id)
                setName('')
                setStep("website")
                setWebsites([])
                //todo push to project page
            } catch (err:any) {
                   if (err instanceof TypeError) {
          setError("Invalid URL. Please check and try again.")
        } else {
          setError(err?.message || "Something went wrong. Try again later.")
        }
            }
            finally{
                        setOpen(false);
            }
         })
 },[name,websites,step])
  // Fetch paginated websites once
  const { results, loadMore, status, isLoading: isQueryLoading } =
    usePaginatedQuery(
      api.website.client.GetUserWebsitesPaginated.default,
      {},
      { initialNumItems: 10 }
    )

  // Cache results with useMemo
  const cachedResults = useMemo(() => results, [results])



  const handlePrev = () => {
    if (step === "name") setStep("website")
  }

  const canProceed =
    (step === "website" && websites.length > 0) ||
    (step === "name" && name.trim().length > 0)

  const canLoadMore = status === "CanLoadMore"

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Create a project</AlertDialogTitle>
          <AlertDialogDescription>
            Talk to multiple websites at once (up to 10)
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-3">
          {step === "website" && (
            <ProjectSelectWebsiteList
              websites={websites}
              onSelect={setWebsites}
              cachedResults={cachedResults}
              loadMore={loadMore}
              canLoadMore={canLoadMore}
              isLoading={isQueryLoading}
            />
          )}
          {step === "name" && (
            <ProjectNameStep name={name} setName={setName} />
          )}
        </div>
    {error && (
            <p className="text-sm text-destructive animate-fade-in">
              {error}
            </p>
          )}
        <AlertDialogFooter className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            {step === "name" && (
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={isPending}
              >
                Previous
              </Button>
            )}
            <AlertDialogCancel
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </AlertDialogCancel>
          </div>
          <Button
            onClick={handleClick}
            disabled={!canProceed || isPending}
            className="min-w-[100px]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...
              </>
            ) : step === "website" ? (
              "Next"
            ) : (
              "Create"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CreateProjectButton
