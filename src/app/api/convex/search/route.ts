import { NextRequest, NextResponse } from "next/server";
import Firecrawl from '@mendable/firecrawl-js';
export const POST = async(req:NextRequest)=>{
    const  authorizzation_token = req.headers.get('X_CONVEX_TOKEN');
    console.log(authorizzation_token)
    if(authorizzation_token!==process.env.CONVEX_TOKEN) return NextResponse.json({
        error: 'Un authorized'
    },{status:401})
    const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL });
    const body = await req.json()
    console.log(body)
    if(!body?.query && !body?.url) return NextResponse.json({error:"Query or url is required"},{status:400})
    if(body.query){
        const results = await firecrawl.search(body.query);
    return NextResponse.json({
        results
    })
    }
    if(body.url){
        const results = await firecrawl.scrape(body.url,{ formats: ["markdown",'links'] });
    return NextResponse.json(results)
    }


}