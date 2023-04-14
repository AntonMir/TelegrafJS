import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import { Message } from 'typegram'

/**
 * Скрипт на любой текст
 */
export class MessageCommand extends Command {

    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }

    handle(): void {

        this.bot.use(ctx => {
            const message = ctx.message as Message.TextMessage
            const editedMessage = ctx.editedMessage as Message.TextMessage

            if(message) {
                ctx.sendMessage(`It's a message: ${message.text}`)
                .then(data => {
                    console.log(data)
                })

                return 
            }

            if(editedMessage) {
                return ctx.sendMessage(editedMessage.text)
            }
            
        })

    }
}