import { Context, Next } from "hono";

export async function resetAndSeedDb(c:Context,next:Next){
    return next()
    
}