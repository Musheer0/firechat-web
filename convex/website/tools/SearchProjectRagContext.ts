import { createTool } from "@convex-dev/agent";
import z from 'zod'
import { rag } from "../../rag";
import { getProjectTranscribeNamespace, getWebsiteTranscribeNamespace } from "../../utils/utils";
export default createTool({
    description:`
    A tool to search and retrieve relevant context from a
     website's data for RAG (Retrieval-Augmented Generation) applications
    `,
    args:z.object({
        query:z.string(),
        projectId:z.string()
    }),
    handler:async(ctx,args)=>{
      try {
          const {text} = await rag.search(ctx,{
            namespace:getProjectTranscribeNamespace(args.projectId),
            query:args.query,
            limit:5,
            vectorScoreThreshold:0.49,
            chunkContext:{
                after:1,
                before:1
            }
        });
        return text;
      } catch (error) {
        throw error
      }
    }

})