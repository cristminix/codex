
import { handleGoogleTestLogin } from "@backend/api/auth";
import { Context, Next } from "hono";

export async function googleTestGLogin(c:Context,next:Next){
       return handleGoogleTestLogin(c.req.raw, c.env);
   
}