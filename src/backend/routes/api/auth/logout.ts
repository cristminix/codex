import { Context, Next } from "hono";

export async function logout(c:Context,next:Next){
    return next()
    
}