import { NextRequest, NextResponse } from "next/server";
import Firecrawl from '@mendable/firecrawl-js';
import { WebsiteTranscribeApiResponse } from "../../../../../../zod/website_transcribe_api_response";
export const POST = async(req:NextRequest)=>{
    const  authorizzation_token = req.headers.get('X-CONVEX_TOKEN');
    console.log(authorizzation_token)
    // if(authorizzation_token!==process.env.CONVEX_TOKEN) return NextResponse.json({
    //     error: 'Un authorized'
    // },{status:401})
    const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL });
    const body = await req.json()
    const doc = await firecrawl.scrape(body.url, { formats: ['markdown','links','images'] });
    const response: WebsiteTranscribeApiResponse = {
        images:doc.images||[],
        links:doc.links||[],
        markdown:doc.markdown||'',
        metadata:{
            favicon:doc.metadata?.favicon||'',
            og_banner:doc.metadata?.ogImage||'',
            title:doc.metadata?.title||'',
            description:doc.metadata?.description ||''
        }
    }
    return NextResponse.json(response)


}