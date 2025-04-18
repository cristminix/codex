
import { Context, Next } from "hono";

export async function googleTestGetVerificationCode(c:Context,next:Next){
    return next()
    
}