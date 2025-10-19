import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    description: v.string(),
    services: v.array(v.string()),
    databases: v.array(v.string()),
    hosting: v.array(v.string()),
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
      searchField: "name",
      filterFields: ["services", "databases", "hosting"]
    })
});
