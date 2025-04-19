import { handleGetCurrentUser } from "@backend/api/auth";
import { Context, Next } from "hono";
import { formatUserResponse } from '@backend/utils/auth.ts';

export async function me(c:Context,next:Next){
        const user = c.get("user")
        return c.json({
                success: true,
                user:formatUserResponse(user),
        })
}