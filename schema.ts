import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    website:defineTable({
        name: v.string(),
        url: v.string(),
        description: v.string(),
        faviconUrl: v.string(),
        ogBannerUrl: v.string(),
        user_id: v.string(),
        rag_entry_id: v.optional(v.string()),
    }).index("by_user", ["user_id"]),
    website_transcribe:defineTable({
        website_id: v.id("website"),
        transcript: v.string(),
        metadata:v.object({  favicon: v.string(),
      og_banner: v.string(),
      title: v.string(),
      description: v.optional(v.string()),}),
        link:v.array(v.string()),
        images:v.array(v.string()),
        user_id: v.string(),
    }).index("by_user", ["user_id"])
    .index("by_website", ["website_id"])
    .index("by_user_website", ["user_id","website_id"]),
    personal_chat:defineTable({
        name:v.optional(v.string()),
        user_id:v.string(),
        website_id:v.id("website"),
        faviconUrl:v.optional(v.string()),
        threadId:v.string(),
    }).index("by_user", ["user_id"])
    .index("by_website", ["website_id"])
    .index("by_user_website", ["user_id","website_id"]),
    personal_message:defineTable({
        chat_id:v.id("personal_chat"),
        content:v.string(),
        user_id:v.string(),
        role:v.union(v.literal("user"),v.literal("assistant"),v.literal("system")),
        pending:v.optional(v.boolean())
    }).index("by_chat", ["chat_id"])
    .index("by_user", ["user_id"])
    .index("by_chat_user",["chat_id","user_id"]),
    project:defineTable({
        name: v.string(),
        entry_ids:v.array(v.string()),
        icon:v.optional(v.string()),
        websites:v.array(v.id("website")),
        threadId:v.string(),
        initial_prompt:v.string(), // title and description of all websites,
        user_id:v.string()
    }).index("by_user", ["user_id"]),
        project_message:defineTable({
        project_id:v.id("project"),
        content:v.string(),
        user_id:v.string(),
        role:v.union(v.literal("user"),v.literal("assistant"),v.literal("system")),
        pending:v.optional(v.boolean())
    }).index("by_project", ["project_id"])
    .index("by_user", ["user_id"])
    .index("by_project_user",["project_id","user_id"]),
})