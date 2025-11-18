import { Id } from "../_generated/dataModel";

export type twebsite_transcribe={
    _id: Id<"website_transcribe">;
    _creationTime: number;
    user_id: string;
    website_id: Id<"website">;
    transcript: string;
    metadata: {
        description?: string | undefined;
        favicon: string;
        og_banner: string;
        title: string;
    };
    link: string[];
    images: string[];
}