import { handleLogout } from "@backend/api/auth";
import { Context, Next } from "hono";

export async function logout(c:Context,next:Next){
        return handleLogout(c.req.raw, c.env);
    
}