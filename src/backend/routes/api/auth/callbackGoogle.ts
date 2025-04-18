import { handleGoogleCallback } from "@backend/api/auth";
import { Context, Next } from "hono";

export async function callbackGoogle(c:Context,next:Next){
        return handleGoogleCallback(c.req.raw, c.env);
    
}