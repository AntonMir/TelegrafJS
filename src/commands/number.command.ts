/**
 * Прослушка /ten
 * Прослушка RegExp
 * Хранилище (локальное) (state) сохранение/изменение
 * Отправка сообщения
 */

import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../Context/context.interface";

export class NumberCommand extends Command {

    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }

    handle(): void {
        this.bot.hears('/ten', (ctx, next) => {
            ctx.state.number = 10
            return next()
        })

        this.bot.hears(/^[0-9]+$/, (ctx, next) => {
            ctx.state.number = parseInt(ctx.message.text)
            return next()
        })

        this.bot.use((ctx, next) => {
            const { number } = ctx.state
            if(isNaN(number)) {
                return next()
            }
            ctx.sendMessage(`It's a number: ${number}`)
            return ctx.reply(`${number} + 1 = ${number + 1}`)
        })

    }

}