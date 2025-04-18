import { Context, Next } from "hono";

export async function processDeletion(c:Context,next:Next){
    return next()
    
}