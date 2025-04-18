import { Context, Next } from "hono";

export async function login(c:Context,next:Next){
    return next()
    
}