import { handleGoogleCallback } from "@backend/api/auth";
import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { OAuth2Client } from "oslo/oauth2";
import { createGoogleOAuth2Client } from "./google/createGoogleOAuth2Client";
import { getGoogleUser } from "./google/getGoogleUser";

export async function callbackGoogle(c:Context,next:Next){
        try {
                const googleOAuth2Client = createGoogleOAuth2Client(c)
                // return handleGoogleCallback(c.req.raw, c.env);
                const {state, code} = c.req.query()
                // const googleOAuth2State = getCookie(c, 'google_oauth2_state')
        
                // if (!googleOAuth2State || !state || googleOAuth2State !== state) {
                //     return c.status(400)
                // }
        
                console.log(`code: ${code}`)
        
                const {access_token} = await googleOAuth2Client.validateAuthorizationCode(
                    code,
                    {
                        credentials: c.env.GOOGLE_CLIENT_SECRET,
                        authenticateWith: "request_body"
                    })
        
                console.log(`accessToken: ${access_token}`)
        
                const user = await getGoogleUser(access_token)
        
                console.log(`user: ${JSON.stringify(user)}`)
        
                // // set user information to the session cookie
                // const session = c.get('session')
                // session.set('user', user)
        
                // return c.redirect('/')
                return c.json({
                    user
                }) 
        } catch (error) {
                console.error('Error during Google OAuth callback:', error);
        }

        return c.json({
                success: false,
                message: 'Failed to authenticate with Google'
        }, 500)
        
    
}