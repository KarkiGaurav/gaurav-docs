import { query } from "./_generated/server";

export const get = query({
    handler: async (ctx) => {
        return ctx.db.query("documents").collect()
    }
})