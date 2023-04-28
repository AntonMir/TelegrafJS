import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../Context/context.interface";
import { Message } from 'typegram'
import { Middleware } from "./middleware.class";

/**
 * Миддлвара на логирование
 */
export class LoggerMiddleware extends Middleware {

    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }

    handle(): void {
        this.bot.use((ctx, next) => {
            // const message = ctx.message as Message.TextMessage // Message.TextMessage - тип данных для доступа к message.txt
            // const editedMessage = ctx.editedMessage as Message.TextMessage
            console.log("Context:", ctx) 
            next()  
        })
    }
}