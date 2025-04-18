import { createHonoWithBinding } from "@backend/fn";
import { authRouter } from "./auth";
import { Context, Next } from "hono";

const apiRouter = createHonoWithBinding()

apiRouter.route("/auth",authRouter)
apiRouter.get("/",(c:Context,next:Next)=>{
    return c.body("This is api router")
})
export {apiRouter}