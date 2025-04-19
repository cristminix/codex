import { Context } from 'hono';
import { getCookie } from 'hono/cookie';

export async function getAuthSession(c:Context,auth:any){
  const sessionCookieName = "auth_session";
  const token = getCookie(c, sessionCookieName);
  let session : any = null
  if(token){
    try{
      session = await auth.getSession(token);
    }catch (e) {
      console.error(e);
    }
  }
  return session
}