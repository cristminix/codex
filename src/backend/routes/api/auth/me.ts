import { handleGetCurrentUser } from "@backend/api/auth";
import { Context, Next } from "hono";

export async function me(c:Context,next:Next){
        return handleGetCurrentUser(c.req.raw, c.env);
    
}