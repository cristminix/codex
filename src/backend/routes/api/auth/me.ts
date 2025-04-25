import { handleGetCurrentUser } from "@backend/api/auth";
import { Context, Next } from "hono";
import { formatUserResponse, initializeLucia } from '@backend/utils/auth.ts';
import { LuciaError } from 'lucia';

export async function me(c:Context,next:Next){
        const auth = initializeLucia(c.env)
        const user = c.get("user")
        const session = c.get("session")

        try {
                const user = await auth.updateSessionAttributes(
                  session.id,
                  {
                          updated_at: new Date()
                  } // expects partial `Lucia.DatabaseUserAttributes`
                );
        } catch (e) {
                if (e instanceof LuciaError && e.message === `AUTH_INVALID_SESSION_ID`) {
                        // invalid user id
                }
                // provided session attributes violates database rules (e.g. unique constraint)
                // or unexpected database errors
        }
        return c.json({
                success: true,
                user:formatUserResponse(user),
        })
}