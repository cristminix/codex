import { Context, Next } from "hono";

export async function me(c:Context,next:Next){
    return next()
    
}