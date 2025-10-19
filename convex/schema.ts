import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    description: v.string(),
    // Each service/database/hosting can have an optional URL
    services: v.array(
      v.object({
        name: v.string(),
        url: v.optional(v.string())
      })
    ),
    databases: v.array(
      v.object({
        name: v.string(),
        url: v.optional(v.string())
      })
    ),
    hosting: v.array(
      v.object({
        name: v.string(),
        url: v.optional(v.string())
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
    dateStarted: v.optional(v.number()),
    dateEnded: v.optional(v.number()),
    monthlyCost: v.optional(v.number()),
    dashboardUrl: v.optional(v.string()),
    notes: v.optional(v.string())
  })
    .index("by_creation", ["createdAt"])
    .searchIndex("search_projects", {
      searchField: "name"
    })
});
