/**
 * Миддлвара
 * Тип данных для сообщения (message.text)
 * Отправка сообщения
 */

import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../Context/context.interface";
import { Message } from 'typegram'


export class MessageCommand extends Command {

    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }

    handle(): void {

        this.bot.use((ctx, next) => {
            const message = ctx.message as Message.TextMessage // Message.TextMessage - тип данных для доступа к message.txt
            const editedMessage = ctx.editedMessage as Message.TextMessage

            if(message) {
                ctx.sendMessage(`It's a message: ${message.text}`) // отправка текста
                return next()
            }

            if(editedMessage) {
                ctx.sendMessage(editedMessage.text)
                return next()
            }
            
        })

    }
}