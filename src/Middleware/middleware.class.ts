import { Telegraf } from "telegraf";
import { IBotContext } from "../Context/context.interface";

export abstract class Middleware {
    constructor(public bot: Telegraf<IBotContext>) {}

    abstract handle(): void
}