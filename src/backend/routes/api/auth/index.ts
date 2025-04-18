import { createHonoWithBinding } from "@backend/fn";
import { login } from "./login";
import { register } from "./register";
import { logout } from "./logout";
import { me } from "./me";
import { verifyEmail } from "./verifyEmail";
import { resendVerification } from "./resendVerification";
import { processDeletion } from "./processDeletion";
import { cancelDeletion } from "./cancelDeletion";
import { google } from "./google";
import { callbackGoogle } from "./callbackGoogle";
import { googleTestGetVerificationCode } from "./googleTestGetVerificationCode";

const authRouter = createHonoWithBinding()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/logout",logout)
authRouter.post("/me",me)


authRouter.post("/verify-email",verifyEmail)
authRouter.post("/resend-verification",resendVerification)

authRouter.post("/process-deletion",processDeletion)
authRouter.post("/cancel-deletion",cancelDeletion)


authRouter.get("/google",google)
authRouter.get("/callback/google",callbackGoogle)
authRouter.get("/google/test-login",callbackGoogle)
authRouter.get("/google/test-get-verification-code",googleTestGetVerificationCode)


export {authRouter}