"use client";

import { usePaginatedQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";

import { HugeiconsIcon } from "@hugeicons/react";
import { PackageIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const UserProjectList = () => {
  const { loadMore, isLoading, results, status } =
    usePaginatedQuery(
      api.project.client.getUserProjectPaginated.default,
      {},
      { initialNumItems: 1 }
    );

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {results.map((project) => (
          <Card
            key={project._id}
            className="border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 text-white shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 rounded-xl"
          >
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-neutral-800/50">
                <HugeiconsIcon
                  icon={PackageIcon}
                  size={26}
                  color="white"
                  strokeWidth={1.5}
                />
              </div>

              <CardTitle className="text-lg font-semibold">
                {project.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-neutral-400">
              <CardDescription className="text-neutral-400">
                You created this project using your brain cells.  
                It has {project.websites.length} linked website(s).
              </CardDescription>
            </CardContent>

            <CardFooter className="flex justify-between items-center pt-2">
              <p className="text-xs text-neutral-500">
                ID: {project._id}
              </p>

           <Link href={'/app/projects/'+project._id}>
              <Button
                size="sm"
                variant={"csecondary"}
                className="hover:bg-neutral-200 "
              >
                Open
              </Button>
           </Link>
            </CardFooter>
          </Card>
        ))}
          {isLoading &&
              <>
              {[1,2,3,4,5,6].map((e)=>{
                return (
                  <React.Fragment key={e}>
                    <Skeleton className='w-full max-w-sm h-[250px]'>
                      
                    </Skeleton>
                  </React.Fragment>
                )
              })}
              </>
              }
      </div>

      {status === "CanLoadMore" && (
        <div className="w-full flex items-center justify-center py-2">
          <Button
            variant="custom"
            disabled={isLoading}
            className="mx-auto"
            onClick={() => loadMore(10)}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProjectList;
