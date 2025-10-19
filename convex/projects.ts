import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getProjects = query({
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_creation")
      .order("desc")
      .collect();
    return projects;
  }
});

export const getProject = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  }
});

export const searchProjects = query({
  args: {
    searchTerm: v.optional(v.string()),
    service: v.optional(v.string()),
    database: v.optional(v.string()),
    hosting: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    let projects = await ctx.db
      .query("projects")
      .withIndex("by_creation")
      .order("desc")
      .collect();

    if (args.searchTerm) {
      const term = args.searchTerm.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    if (args.service) {
      projects = projects.filter((p) => p.services.includes(args.service!));
    }

    if (args.database) {
      projects = projects.filter((p) => p.databases.includes(args.database!));
    }

    if (args.hosting) {
      projects = projects.filter((p) => p.hosting.includes(args.hosting!));
    }

    return projects;
  }
});

export const getAllTags = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();

    const services = new Set<string>();
    const databases = new Set<string>();
    const hosting = new Set<string>();

    projects.forEach((project) => {
      project.services.forEach((s) => services.add(s));
      project.databases.forEach((d) => databases.add(d));
      project.hosting.forEach((h) => hosting.add(h));
    });

    return {
      services: Array.from(services).sort(),
      databases: Array.from(databases).sort(),
      hosting: Array.from(hosting).sort()
    };
  }
});

export const createProject = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    services: v.array(v.string()),
    databases: v.array(v.string()),
    hosting: v.array(v.string()),
    dateStarted: v.optional(v.number()),
    dateEnded: v.optional(v.number()),
    monthlyCost: v.optional(v.number()),
    dashboardUrl: v.optional(v.string()),
    notes: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const projectId = await ctx.db.insert("projects", {
      ...args,
      createdAt: now,
      updatedAt: now
    });
    return projectId;
  }
});

export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    name: v.string(),
    description: v.string(),
    services: v.array(v.string()),
    databases: v.array(v.string()),
    hosting: v.array(v.string()),
    dateStarted: v.optional(v.number()),
    dateEnded: v.optional(v.number()),
    monthlyCost: v.optional(v.number()),
    dashboardUrl: v.optional(v.string()),
    notes: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now()
    });
    return id;
  }
});

export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  }
});

