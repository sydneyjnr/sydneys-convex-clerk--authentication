import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/* CREATE TASK */
export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("tasks", {
      title: args.title,
      description: args.description,
      completed: false,
      userId: identity.subject,
      createdAt: Date.now(),
    });
  },
});

/* TOGGLE TASK */
export const toggleTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== identity.subject) {
      throw new Error("Forbidden");
    }

    await ctx.db.patch(args.id, {
      completed: !task.completed,
    });
  },
});

/* DELETE TASK */
export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== identity.subject) {
      throw new Error("Forbidden");
    }

    await ctx.db.delete(args.id);
  },
});

/* GET USER TASKS */
export const getMyTasks = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) =>
        q.eq("userId", identity.subject)
      )
      .collect();
  },
});
