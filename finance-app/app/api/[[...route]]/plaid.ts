import { clerkMiddleware } from "@hono/clerk-auth";
import { Hono } from "hono";

const app = new Hono()
    .post("/create-link-token",
    clerkMiddleware(),
    async (c) => {
        return c.json({plaid:true});
    }
    )


export default app;