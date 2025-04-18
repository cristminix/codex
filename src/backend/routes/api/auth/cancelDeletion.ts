import { Context, Next } from "hono";

export async function cancelDeletion(c:Context,next:Next){
    return next()
    
}