import { createDb } from "@backend/db/client";
import { prompts, responses } from "@backend/db/schema";
import { createHonoWithBinding } from "@backend/fn";
import { getPromptById } from "@backend/services/promptService";
import { Context, Next } from "hono";
import { eq, and } from 'drizzle-orm';

const responseRouter = createHonoWithBinding()
async function getPromptWithId(db:any,promptId: any){
    const [prompt] = await db
    .select()
    .from(prompts)
    .where(eq(prompts.id, promptId))
    .limit(1);

    return prompt
}

async function getPromptResponsesWithPromptId(db:any,promptId:any){
    const promptResponses = await db
                      .select()
                      .from(responses)
                      .where(eq(responses.promptId, promptId))
                      .orderBy(responses.createdAt);
    return promptResponses
                
}
async function getPromptResponsesWithId(db:any,id:any){
    const promptResponses = await db
                      .select()
                      .from(responses)
                      .where(eq(responses.id, id))
                    //   .orderBy(responses.createdAt);
    return promptResponses
                
}
responseRouter.get("/prompts/:promptId/responses", async(c:Context,next:Next)=>{
    const user = c.get("user") 
    const promptId = c.req.param("promptId")
    const db = createDb(c.env.DB)
    let validUser = user ? true:false
    if( promptId){
        try {
            const prompt= await getPromptWithId(db,promptId)
            if(prompt){
                if(prompt.isPublic || validUser){
                    if(validUser){
                        if(prompt.userId !== user.id){
                          return c.body(null, 403);
                        }
                    }
                    const promptResponses = await getPromptResponsesWithPromptId(db,promptId)
                
                    // Don't include the full content, just metadata
                    return c.json(promptResponses);
                }
            }
        } catch (error) {
                    
        }
        return c.body(null, 403);

    }
})

responseRouter.get("/prompts/:promptId/responses/:responseId", async(c:Context,next:Next)=>{
})
responseRouter.post("/prompts/:promptId/responses", async(c:Context,next:Next)=>{
})

export {responseRouter}