import { createHonoWithBinding } from "@backend/fn";
import { authRouter } from "./auth";
import { Context, Next } from "hono";
import { health } from "./health";
import { resetDb } from "./resetDb";
import { resetAndSeedDb } from "./resetAndSeedDb";
import { seedTestData } from "./seedTestData";
import { promptRouter } from "./prompts";
import { responseRouter } from "./responses";

const apiRouter = createHonoWithBinding()

apiRouter.get("/",(c:Context,next:Next)=>{
    return c.json({
        status: 'ok',
        version: '1.0', // Consider making this dynamic (e.g., from env or build step)
        environment: c.env.ENVIRONMENT || 'unknown',
    })
})

apiRouter.get("/health",health)
apiRouter.post("/reset-db",resetDb)
apiRouter.post("/reset-and-seed-db",resetAndSeedDb)
apiRouter.use("/seed-test-data",seedTestData)

apiRouter.route("/auth",authRouter)
apiRouter.route("/prompts",promptRouter)
apiRouter.route("/responses",responseRouter)

export {apiRouter}