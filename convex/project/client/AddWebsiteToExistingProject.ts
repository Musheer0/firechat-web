import { ConvexError, v } from "convex/values";
import { action } from "../../_generated/server";
import { internal } from "../../_generated/api";
import { rag } from "../../rag";
import { getProjectTranscribeNamespace } from "../../utils/utils";

export default action({
    args:{
        websites:v.array(v.id("website")),
        project_id:v.id("project")
    },
    handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();
        if(!auth) throw new ConvexError("Unauthorized");
        const project = await ctx.runMutation(internal.project.server.GetProjectByIdInterna.default,{
            project_id:args.project_id
        });
        if(!project) throw new ConvexError("Project Not found");
        const updated_websites=[...project.websites,...args.websites];
        const updated_entryIds=[...project.entry_ids]
        for (const id of args.websites){
            const transcribe = await ctx.runQuery(internal.website.server.QueryUserWebsiteInternal.getTranscribeDb,{
                website_id:id
            });
            const {entryId} = await rag.add(ctx,{
                namespace:getProjectTranscribeNamespace(project._id),
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
            });
            updated_entryIds.push(entryId);
        }   
         await ctx.runMutation(internal.project.server.AddWebsiteToExsistingProject.default,{
            entry_ids:updated_entryIds,
            websites:updated_websites,
            project_id:project._id
         });
    }
})