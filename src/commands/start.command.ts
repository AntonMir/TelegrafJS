import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";

/**
 * Скрипт на команду /start
 */
export class StartCommand extends Command {

    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }
    
    handle(): void {
        this.bot.start(ctx => {
            console.log(ctx.session)
            ctx.reply(
                "Приветствую тебя дорогой друг!",
                Markup.inlineKeyboard([
                    Markup.button.callback("Привет!", "start_hello"),
                    Markup.button.callback("Кто ты такой?", "start_who_are_you"),
                ])
            )
        })

        this.bot.action('start_hello', ctx => {
            // ctx.session.isLike = true
            ctx.editMessageText("Окей")
        })
        this.bot.action('start_who_are_you', ctx => {
            // ctx.session.isLike = false
            ctx.editMessageText("Заменяем старый текст")
            ctx.sendMessage('пишем новый текст')
         })

    }
}