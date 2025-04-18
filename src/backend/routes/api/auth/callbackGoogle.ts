import { Context, Next } from "hono";

export async function callbackGoogle(c:Context,next:Next){
    return c.body("This is callbackGoogle")

    
}