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
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { checkAuthSession } from '@backend/routes/api/middlewares/checkAuthSession.ts';

const authRouter = createHonoWithBinding()

authRouter.post("/register",register)
authRouter.post("/login",zValidator(
  'json',
  z.object({
    email: z.string().email(),
    password:z.string().min(1)
  })
),login)
authRouter.post("/logout",logout)
authRouter.get("/me",checkAuthSession,me)


authRouter.post("/verify-email",verifyEmail)
authRouter.post("/resend-verification",resendVerification)

authRouter.post("/process-deletion",processDeletion)
authRouter.post("/cancel-deletion",cancelDeletion)


authRouter.get("/google",google)
authRouter.get("/callback/google",callbackGoogle)
authRouter.get("/google/test-login",callbackGoogle)
authRouter.get("/google/test-get-verification-code",googleTestGetVerificationCode)


export {authRouter}