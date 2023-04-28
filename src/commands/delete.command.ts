/**
 * Удаление
 * Модальное окно
 * Кастомные Кнопки
 * Прослушивание сообщения
 */

import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../Context/context.interface";

export class DeleteCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }

    handle(): void {

        const keyboard = Markup.keyboard([
            ['Top'],
            ['Bottom left', 'Bottom right'],
            ['/delete'],
            ['15', '36', '68']
        ])

        const inline_keyboard = Markup.inlineKeyboard([
            Markup.button.callback('Yes', 'delete'),
            Markup.button.callback('No', 'cancel')
        ])

        this.bot.action('delete', async ctx => {
            await ctx.answerCbQuery('Your wish is my command') // модальное окошко с оповещением

            ctx.deleteMessage()

            return ctx.reply('It\'s a usual keyboard', keyboard)
        })

        this.bot.action('cancel', ctx => {
            ctx.answerCbQuery('Okey, I won\'t do that', {show_alert: true})
        })

        this.bot.hears('/delete', (ctx, next) => {
            ctx.reply('Delete me?', inline_keyboard)
            return next()
        })
    }
}