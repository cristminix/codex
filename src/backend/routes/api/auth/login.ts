import { handleLogin } from "@backend/api/auth";
import { Context, Next } from "hono";

export async function login(c:Context,next:Next){
        return handleLogin(c.req.raw, c.env);
    
}