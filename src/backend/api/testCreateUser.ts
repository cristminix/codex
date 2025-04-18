import { initializeLucia } from "@backend/utils/auth";

export async function testCreateUser(request:any, env:any){
    const auth = initializeLucia(env)
    const username = "cristminix"
    const email = "cristminix@gmail.com"
    const password = "password123"

    try {
		const user = await auth.createUser({
			key: {
				providerId: "email", // auth method
				providerUserId: email, // unique id when using "username" auth method
				password // hashed by Lucia
			},
			attributes: {
				username,password_hash:password,
                email,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                email_verified: 1,
                marked_for_deletion: 0,
                deleted_at: null,
                verification_code: null,
                verification_code_expires_at: null,
			}
		});
		// const session = await auth.createSession({
		// 	userId: user.userId,
		// 	attributes: {}
		// });
		// const sessionCookie = auth.createSessionCookie(session);
		// redirect to profile page
		return {
			// headers: {
			// 	Location: "/",
			// 	"Set-Cookie": sessionCookie.serialize() // store session cookie
			// },
			status: 302
		}
	} catch (e) {
		// this part depends on the database you're using
		// check for unique constraint error in user table
		// if (
		// 	e instanceof SomeDatabaseError &&
		// 	e.message === USER_TABLE_UNIQUE_CONSTRAINT_ERROR
		// ) {
		// 	return new Response("Username already taken", {
		// 		status: 400
		// 	});
		// }
        console.error(e)
		return {
            errorMessage : "An unknown error occurred", 
			status: 500
		}
	}
   
}