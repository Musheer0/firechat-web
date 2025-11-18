import { ConvexError, v } from "convex/values";
import { action } from "../../_generated/server";
import { internal } from "../../_generated/api";
import { Id } from "../../_generated/dataModel";
import { twebsite_transcribe } from "../../types/type.website-transcribe";
import { rag } from "../../rag";
import { getProjectTranscribeNamespace } from "../../utils/utils";
import { Project_agent } from "../../agents/ProjectAgent";

export default action({
    args:{
        name:v.string(),
        websites:v.array(v.id("website"))
    },
    handler:async(ctx,args):Promise<Id<"project">>=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth) throw new  ConvexError("Un authorized");
        const transcribes:twebsite_transcribe[] = []
        const entryIds:string[] = []

        //step 0
        // fetch website transcrive
     for (const id of args.websites){
        const website_transcribe = await ctx.runQuery(
            internal.
            website.
            server.
            QueryUserWebsiteInternal.getTranscribeDb,{
            website_id:id as Id<"website">
        });
        transcribes.push(website_transcribe) 
     }
    if(transcribes.length==0) throw new ConvexError("no transcribe found");
    // create intial_project_prompt 
    /**
     * Just a mini system prompt injected inside the user prompt which contains
     * all website name and description making the agent easierr to query
     */
    
    const website_details =  Array.from(transcribes).map((t)=>{
        return ` name:${t.metadata.title}, desc:${t.metadata.description}`
     }).join(',')
    const initial_prompt = `
     Here is a list of selected websites
     ${
      website_details
     }
     `
     //step 1 create a thread
         const {threadId} = await Project_agent.createThread(ctx,{
        userId:auth.subject
     });
     //save  data to db
     const project_id = await ctx.runMutation(internal.project.server.CreateProjectDb.default,{
        name:args.name,
        websites:args.websites,
        initial_prompt,
        threadId:threadId
     });
    
     //generate rag
     for  (const transcribe of  transcribes){
        const {entryId} = await rag.add(ctx,
            {
                namespace:getProjectTranscribeNamespace(project_id),
                contentHash:transcribe.website_id,
                text:`
            links: ${JSON.stringify(transcribe.link)}
            images: ${JSON.stringify(transcribe.images)}
            transcript: ${transcribe.transcript}
            `,
            metadata:{
                  website_id:transcribe.website_id,
                transcribe_id:transcribe._id,
                website_metadata:transcribe.metadata
            }
            }
        );
        entryIds.push(entryId);
     };
     //rollback on error
         if(entryIds.length==0) {
            await ctx.runMutation(internal.project.server.DeleteProjectInternal.default,{
                id:project_id
            });
            throw new ConvexError("failed to create entry id");
         }
         
        //patch the project with entry id
         await ctx.runMutation(internal.project.server.AddEntryIds.default,{
            entryIds:entryIds,
            id:project_id
         });
         return project_id 
          
    }
})

//create rag ->entry id
//create thread-> thread id 
//create project->project id