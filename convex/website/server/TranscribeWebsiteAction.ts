import { v } from "convex/values";
import { internalAction } from "../../_generated/server";
import { WebsiteTranscribeApiResponseSchema } from "../../../zod/website_transcribe_api_response";
export default internalAction({
    args:{
        url:v.string()
    },
    handler:async(ctx,args)=>{
        const auth = await ctx.auth.getUserIdentity();  
        if(!auth){
            throw new Error("Unauthorized");
        };
        try {
            const req = await fetch(process.env.WEBSITE_SCRAPE_ENDPOINT!, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-User-ID": auth.subject,
                    "X-CONVEX_TOKEN": process.env.CONVEX_TOKEN || "",
                },
                body: JSON.stringify({ url: args.url }),
            });
            if(!req.ok){
                throw new Error(`Failed to fetch website metadata: ${req.statusText}`);
            }
            const data = await req.json();
            const safe_data = WebsiteTranscribeApiResponseSchema.parse(data);
            return safe_data
        } catch (error) {
            console.error("Error in CreateUserWebsiteInternal:", error);
            throw error;
        }
    }
})