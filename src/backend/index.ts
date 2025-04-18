
import { cors } from 'hono/cors'

import { apiRouter } from './routes/api';
import { createHonoWithBinding } from './fn';

const app = createHonoWithBinding()
app.use('*', cors())


app.route("/api",apiRouter)
export default app