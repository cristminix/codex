import { Context } from "hono";
import { OAuth2Client } from "oslo/oauth2";



export const createGoogleOAuth2Client = (c: Context) => {
    return new OAuth2Client(
                    c.env.GOOGLE_CLIENT_ID,
                    "https://accounts.google.com/o/oauth2/v2/auth",
                    "https://oauth2.googleapis.com/token",
                    {
                        redirectURI: "http://localhost:8787/api/auth/callback/google"
            });
        }