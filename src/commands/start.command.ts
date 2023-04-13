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
                    Markup.button.callback("Привет!", "start_greeting_answer_good"),
                    Markup.button.callback("Кто ты такой?", "start_greeting_answer_bad"),
                ])
            )
        })

        this.bot.action('start_greeting_answer_good', ctx => {
            // ctx.session.isLike = true
            ctx.editMessageText("Окей")
        })
        this.bot.action('start_greeting_answer_bad', ctx => {
            // ctx.session.isLike = false
            ctx.editMessageText("Печаль")
        })

    }
}