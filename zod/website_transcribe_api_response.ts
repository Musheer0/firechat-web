import z from "zod";

export const WebsiteTranscribeApiResponseSchema = z.object({
    markdown:z.string(),
    links:z.array(z.string()),
    images:z.array(z.string()),
    metadata:z.object({
        favicon:z.string(),
        title:z.string(),
        description:z.string().optional(),
        og_banner:z.string(),
    })
});
export type WebsiteTranscribeApiResponse = z.infer<typeof WebsiteTranscribeApiResponseSchema>;