import { Context, Next } from "hono";

export async function verifyEmail(c:Context,next:Next){
    return next()
    
}