import { resetDatabase } from "@backend/utils/resetDatabase";
import { Context, Next } from "hono";

export async function resetDb(c:Context,next:Next){
    if(c.env.ENVIRONMENT === "development"){
        try {
            // Only proceed if the admin key header is present
            const adminKey = c.req.header('X-Admin-Key');
            
            if (!adminKey) {
                return c.json({
                        code:'UNAUTHORIZED',
                        message:' Admin key required',
                        error:null
                    },
                    401
                );
            }
            
            // Parse the request body if available
            let forceClean = false;
            try {
            const body = await c.req.json();
            forceClean = !!body.forceClean;
            } catch (e) {
            // Ignore JSON parsing errors
            }
            
            if (forceClean) {
            console.log('FORCE CLEAN mode enabled - completely resetting database');
            }
            
            // Run the reset operation
            const result = await resetDatabase(c.env, adminKey);
            
            if (result.success) {
            return c.json(
                {
                    ...result,
                    testCredentials: {
                        email: 'alice@example.com',
                        password: 'password123'
                    },
                    forceClean
                }
            );
            } else {
            return c.json(
                {
                    code:'RESET_FAILED',
                    message:result.message,
                    error: result.error 
                },
                500
            );
            }
        } catch (error) {
            console.error('Error resetting database:', error);
            return c.json({
                code:'INTERNAL_SERVER_ERROR',
                message:'Failed to reset database',
                error:null,
            },500);
        }
    }
    
}