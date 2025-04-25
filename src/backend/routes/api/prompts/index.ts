import { createHonoWithBinding } from "@backend/fn";
import {
    deletePrompt,
    getPromptById,
    getPublicPrompts,
    getUserPrompts,
    PromptData,
    ResponseWithContent,
    updatePrompt,
} from '@backend/services/promptService';
import { Context, Next } from "hono";
import { getContent } from '@backend/utils/storage.ts';
import { getAuthSession } from '@backend/fn/getAuthSession.ts';
import { initializeLucia } from '@backend/utils/auth.ts';
import { checkAuthSession } from '@backend/routes/api/middlewares/checkAuthSession.ts';

const promptRouter = createHonoWithBinding()


// must be authenticated
promptRouter.get("/:promptId",checkAuthSession,async(c:Context,next:Next)=>{
    const session = c.get("session")
    const user = session.user;
    const promptId = c.req.param("promptId")
    if(user && promptId){
        try {
        
            const prompt = await getPromptById(c.env, promptId, user.userId);
            return c.json(prompt, 200);
        } catch (error) {
                    
        }
    }
    return c.body('null',400)
})

promptRouter.get("/",async(c:Context,next:Next)=>{
    const auth = initializeLucia(c.env)
    const session = await getAuthSession(c,auth)
    let user:any = null
    if(session){
        user = session.user;
    }
    let prompts :any = null
    try {
        if(user){
            prompts = await getUserPrompts(c.env, user.userId);
        }else{
            prompts = await getPublicPrompts(c.env);
        }
        prompts = await Promise.all(
          prompts.map(async (response) => {
              const content = await getContent(c.env, response.contentBlobKey);
              return { ...response, content } as ResponseWithContent;
          })
        );
        return c.json(prompts, 200);
    } catch (error) {
                    
    }
    return c.body('null',400)
})


promptRouter.put("/:promptId",checkAuthSession,async(c:Context,next:Next)=>{
    const user = c.get("user") 
    const promptId = c.req.param("promptId")
    const promptData = await c.req.json() as PromptData;
    if(user && promptId){
        try {

            const result = await updatePrompt(
                c.env,
                promptId,
                user.id,
                promptData,
                c
            );
            return c.json(result);
        } catch (error) {
                
        }
    }
    return c.body('null',400)

})

promptRouter.delete("/:prompId",checkAuthSession,async(c:Context,next:Next)=>{
    const user = c.get("user") 
    const promptId = c.req.param("promptId")
    if(user && promptId){
        try {
            const result = await deletePrompt(
                c.env,
                promptId,
                user.userId,
                c
            );
            return c.json(result);
        } catch (error) {
            
        }

    }
    return c.body('null',400)

})
export {promptRouter}