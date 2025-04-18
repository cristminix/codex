import { Context, Next } from "hono";

export async function register(c:Context,next:Next){
    return next()
}