
import { cors } from 'hono/cors'

import { apiRouter } from './routes/api';
import { createHonoWithBinding } from './fn';

const app = createHonoWithBinding()
app.use("*", (c, next) => {
  const origins =
    c.env.ALLOWED_ORIGINS == "*"
      ? "*"
      : c.env.ALLOWED_ORIGINS.split(",");
  console.log(origins);
  const corsMiddleware = cors({
    origin: origins,
    credentials: true,
  });
  return corsMiddleware(c, next);
});


app.route("/api",apiRouter)
export default app