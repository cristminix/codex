import { handleRegistration } from "@backend/api/auth";
import { Context, Next } from "hono";

export async function register(c:Context,next:Next){
     return handleRegistration(c.req.raw, c.env);
    
}