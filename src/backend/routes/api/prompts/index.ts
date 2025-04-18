import { createHonoWithBinding } from "@backend/fn";
import { deletePrompt, getPromptById, getPublicPrompts, getUserPrompts, PromptData, updatePrompt } from "@backend/services/promptService";
import { Context, Next } from "hono";

const promptRouter = createHonoWithBinding()


// must be authenticated
promptRouter.get("/:promptId",async(c:Context,next:Next)=>{
    const user = c.get("user") 
    const promptId = c.req.param("promptId")
    if(user && promptId){
        try {
        
            const prompt = await getPromptById(c.env, promptId, user.id);
            return c.json(prompt, 200);
        } catch (error) {
                    
        }
    }
})

promptRouter.get("/",async(c:Context,next:Next)=>{
    const user = c.get("user") 
    
    let prompts :any = null
    try {
        if(user){
            prompts = await getUserPrompts(c.env, user.id);
        }else{
            prompts = await getPublicPrompts(c.env);
        }
        return c.json(prompts, 200);
    } catch (error) {
                    
    }
})


promptRouter.put("/:promptId",async(c:Context,next:Next)=>{
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
})

promptRouter.delete("/:prompId",async(c:Context,next:Next)=>{
    const user = c.get("user") 
    const promptId = c.req.param("promptId")
    if(user && promptId){
        try {
            const result = await deletePrompt(
                c.env,
                promptId,
                user.id,
                c
            );
            return c.json(result);
        } catch (error) {
            
        }
        
    }
})
export {promptRouter}