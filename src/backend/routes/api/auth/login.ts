import { handleLogin } from "@backend/api/auth";
import { Context, Next} from "hono";
import { zValidator } from '@hono/zod-validator';
import { getCookie } from 'hono/cookie';
import { formatUserResponse, initializeLucia } from '@backend/utils/auth.ts';
import { getAuthSession } from '@backend/fn/getAuthSession.ts';

export async function login(c:Context,next:Next){
  const auth = initializeLucia(c.env)
  const session = await getAuthSession(c,auth)
  if(session){
        return c.json({
          success:true,
          token: session.sessionId,
          user: formatUserResponse(session.user)
        })
  }
  // @ts-ignore
  const {email, password} = c.req.valid("json")
  try{
    // Find key using email
    const key = await auth.useKey("email", email, password);
    const user =  await auth.getUser(key.userId);
    // Create session
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {}
    });
    const sessionCookie = auth.createSessionCookie(session);
    const userResponse = formatUserResponse(user);
    c.header('Set-Cookie',sessionCookie.serialize(),{append:true})
    return c.json({
      success:true,
      token: session.sessionId,
      user: userResponse
    })
  }catch (e) {
    return c.json({
      error:e,
      code:'LOGIN_FAILED',
      message:'An error occurred during login',
    },500)
  }

  return c.json({
    code:'LOGIN_FAILED',
    message:'An error occurred during login',
  },500)

        // return handleLogin(c.req.raw, c.env);
    
}