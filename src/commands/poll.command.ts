/**
 * Голосование (публичное и аннонимное)
 * Триггер на изменение Голосования
 * Триггер на твой голос
 * Триггер на отмену голоса
 * Отправка сообщения определенному пользователю по user_id
 */

import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../Context/context.interface";
import { ConfigService } from "../Config/config.service";
import { IConfigService } from "../Config/config.interface";

export class PollCommand extends Command {

    private readonly configService: IConfigService

    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
        this.configService = new ConfigService()
    }

    handle(): void {
        
        const options = ['Yes', 'No']
        const my_id = this.configService.get('USER_ID')

        this.bot.hears('/poll_anon', ctx => ctx.replyWithPoll('Do you use arch btw?', options))
        this.bot.hears('/poll_pub', ctx => ctx.replyWithPoll('Do you use arch btw?', options, { is_anonymous: false}))

        this.bot.on('poll', ctx => {
            const poll_state = ctx.poll.options.map(({text, voter_count}) => `${text}: ${voter_count}`).join('\n')

            return ctx.telegram.sendMessage(my_id, `Current state:\n\n${poll_state}`)
        })

        this.bot.on('poll_answer', ctx => {

            const name = ctx.pollAnswer.user.first_name
            const option = options[ctx.pollAnswer.option_ids[0]]

            if(!option) return ctx.telegram.sendMessage(my_id, `${name} has retracted his vote`)

            return ctx.telegram.sendMessage(my_id, `${name} has voted for "${option}"`)
        })
    }
}