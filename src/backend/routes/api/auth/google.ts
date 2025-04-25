import { handleGoogleAuth } from "@backend/api/auth";
import { Context, Next } from "hono";
import { generateState } from "oslo/oauth2";
import { createGoogleOAuth2Client } from "./google/createGoogleOAuth2Client";
import { setCookie } from "hono/cookie";

export async function google(c:Context,next:Next){
        // return handleGoogleAuth(c.req.raw, c.env);
        const googleOAuth2State = generateState()
        const googleOAuth2Client = createGoogleOAuth2Client(c)
        const url = await googleOAuth2Client.createAuthorizationURL({
            state: googleOAuth2State,
            scopes: ["https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email"]
        });

        console.log(`Redirect url: ${url}`)

        setCookie(c,
            "google_oauth2_state",
            googleOAuth2State,
            {
                httpOnly: true,
                secure: false, // `true` for production
                path: "/",
                maxAge: 60 * 60
            })

        return c.json({success:true,
                data:{url:url.toString() + '&prompt=select_account'}})
    
}