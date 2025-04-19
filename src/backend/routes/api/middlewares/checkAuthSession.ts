import { Context,Next } from 'hono';
import { formatUserResponse, initializeLucia } from '@backend/utils/auth.ts';
import { getCookie } from 'hono/cookie';
import { getAuthSession } from '@backend/fn/getAuthSession.ts';

export async function checkAuthSession(c:Context,next:Next) {
  const auth = initializeLucia(c.env)
  const session = await getAuthSession(c,auth)
  if(!session){
    return c.json(
      {
        success:false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        },
      },
      401
    );
  }
  c.set("session",session)
  c.set("user",session.user)
  return next()
}