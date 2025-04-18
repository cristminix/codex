import { Context, Next } from "hono";

export async function google(c:Context,next:Next){
    return next()
    
}