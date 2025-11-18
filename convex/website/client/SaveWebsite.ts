import { ConvexError, v } from "convex/values";
import { action } from "../../_generated/server";
import {internal} from '../../_generated/api'
import { rag } from "../../rag";
export default action({
    args:{
        url:v.string()
    },
    handler:async(ctx,args)=>{
        console.log(args)
        const auth =await ctx.auth.getUserIdentity();
        if(!auth) throw new ConvexError("Unauthorized");
        //step 1 : get website info from external api
        const website_info = await ctx.runAction(internal.website.server.TranscribeWebsiteAction.default,{
            url:args.url
        });
        //step 2 : save website basic info to db
        const website_id = await ctx.runMutation(internal.website.server.SaveWebsiteToDbInternal.default,{
            url:args.url,
            description:website_info.metadata.description||"error getting description",
            faviconUrl:website_info.metadata.favicon||"./favicon-none.png",
            name:website_info.metadata.title||"error getting title",
            ogBannerUrl:website_info.metadata.og_banner||"./og-none.png",
        });
        //step 3 : save website transcribe info to db
        const transcribe_id =  await ctx.runMutation(internal.website.server.SaveWebsiteTranscribeToDb.default,{
            website_id:website_id,
            transcript:website_info.markdown,       
            metadata:website_info.metadata,
            link:website_info.links,
            images:website_info.images,
        });
        // setp 4 vectore website transcribe info
        const {entryId} = await rag.add(ctx,{
            namespace:"website_transcribe_v1_"+website_id,
            text:`
            links: ${JSON.stringify(website_info.links)}
            images: ${JSON.stringify(website_info.images)}
            transcript: ${website_info.markdown}
            `,
            metadata: {
                website_id:website_id,
                transcribe_id:transcribe_id,
                website_metadata:website_info.metadata
            },
            contentHash:website_id
        });
        //step 5 save rag entry id to website table
        await ctx.runMutation(internal.website.server.SaveEntryIdWebsite.default,{
            entryId:entryId,
            websiteId:website_id
        });
        return {
           success:true
        }
    }
})
