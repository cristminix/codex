import { Context, Next } from "hono";

export async function health(c:Context,next:Next){
    return c.json({
        status: 'ok',
        version: '1.0',
        environment: c.env.ENVIRONMENT || 'unknown',
      })
    
}