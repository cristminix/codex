import { handleLogout } from "@backend/api/auth";
import { Context, Next } from "hono";
import { createErrorResponse, createSuccessResponse } from '@backend/middleware/cors.ts';
import { initializeLucia } from '@backend/utils/auth.ts';

export async function logout(c:Context,next:Next){

        const session = c.get("session")
        const request = c.req.raw
        const env = c.env
        const auth = initializeLucia(c.env)
        try {
                // Validate session from cookie/header
                if (!session) {
                        // No active session, maybe already logged out or cookie expired
                        return createSuccessResponse(request, { message: 'Already logged out' }, 200, env);
                }

                // Invalidate the session in the database
                await auth.invalidateSession(session.sessionId);

                // Create a blank cookie to clear the browser's session cookie
                // const blankCookie = session.createBlankSessionCookie();

                console.log('User logged out, invalidating session:', session.sessionId);

                // Respond with success and clear cookie header
                return new Response(null, {
                        status: 200,
                        headers: {
                                // 'Set-Cookie': blankCookie.serialize(),
                                'Content-Type': 'application/json' // Ensure correct content type for potential empty body
                        },
                        // Sending an empty body or a simple success message
                        // body: JSON.stringify({ message: 'Logout successful' })
                });

        } catch (error) {
                console.error('Logout error:', error);
                // Create a blank cookie even on error to attempt clearing the client state
                const blankCookie = session.createBlankSessionCookie();
                return createErrorResponse(
                  request,
                  500,
                  'LOGOUT_FAILED',
                  'Failed to logout',
                  null,
                  env,
                  // { 'Set-Cookie': blankCookie.serialize() } // Add clear cookie header to error response
                );
        }
    
}