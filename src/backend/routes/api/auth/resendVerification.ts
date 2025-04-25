import { Context, Next } from "hono";

export async function resendVerification(c:Context,next:Next){
    return next()
    
}