import { handleGoogleAuth } from "@backend/api/auth";
import { Context, Next } from "hono";

export async function google(c:Context,next:Next){
        return handleGoogleAuth(c.req.raw, c.env);
    
}