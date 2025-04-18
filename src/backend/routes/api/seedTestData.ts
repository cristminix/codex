import { seedTestData as seedTestDataFn} from "@backend/utils/seedTestData";
import { Context, Next } from "hono";

export async function seedTestData(c:Context,next:Next){
    if(c.env.ENVIRONMENT === "development"){
        const result = await seedTestDataFn(c.env);
        return c.json(result, 200);
    }
    return c.body(null,400)
}