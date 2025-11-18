import { vEntryId } from "@convex-dev/rag";
import { internalAction } from "../_generated/server";
import { rag } from "../rag";

export default internalAction({
    args:{
        entry_id:vEntryId
    },
    handler:(ctx,args)=>{
        return  rag.delete(ctx,{entryId:args.entry_id})
    }
})