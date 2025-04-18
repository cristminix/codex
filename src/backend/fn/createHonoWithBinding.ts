import { Env } from "@backend/types";
import {  Hono } from "hono";

export function createHonoWithBinding(){
    return new Hono<{ Bindings: Env }>()
}