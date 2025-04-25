import { Context } from 'hono';
import { getCookie } from 'hono/cookie';

export async function getAuthSession(c:Context,auth:any){
  const sessionCookieName = "auth_session";
  let token = getCookie(c, sessionCookieName);
  let session : any = null
  if(!token){
    // @ts-ignore
    token = c.req.header("authorization").replace("Bearer ","");
  }
  if(token){
    try{
      session = await auth.getSession(token);
    }catch (e) {
      // console.error(e);
    }
  }
  // console.log({token,session})

  return session
}