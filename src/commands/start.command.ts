/**
 * Старт
 * Клавиатура (Разметка: Mark)
 * Триггеры на actions кнопок клавиатуры
 * Изменение сообщения
 * Отправка сообщения
 */

import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../Context/context.interface";

/**
 * Скрипт на команду /start
 */
export class StartCommand extends Command {

    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }
    
    handle(): void {
        this.bot.start((ctx) => {
            // reply - блок с заголовком и кнопками
            // Markup - класс разметки
            // inlineKeyboard - выстроить на одной линии
            // Markup.button.callback - кнопка + название action
            ctx.reply(
                "Приветствую тебя дорогой друг!",
                Markup.inlineKeyboard([
                    Markup.button.callback("Привет!", "start_hello"),
                    Markup.button.callback("Кто ты такой?", "start_who_are_you"),
                ])
            )
        })

        // триггер на action
        this.bot.action('start_hello', ctx => {
            // ctx.session.isLike = true // смена состояния контекста (контекст указан в папке context)
            ctx.editMessageText("Окей") // изменяет последнее сообщение бота на указанное
        })
        this.bot.action('start_who_are_you', ctx => {
            // ctx.session.isLike = false // смена состояния контекста (контекст указан в папке context)
            ctx.editMessageText("Заменяем старый текст")
            ctx.sendMessage('пишем новый текст')
        })

    }
}