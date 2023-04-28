import { Telegraf } from "telegraf";
import { IConfigService } from "../Config/config.interface";
import { ConfigService } from "../Config/config.service";
import { IBotContext } from "../Context/context.interface";
import { Command } from "../Commands/command.class";
import { StartCommand } from "../Commands/start.command";
import LocalSession from "telegraf-session-local";
import { MessageCommand } from "../Commands/message.command";
import { Middleware } from "../Middleware/middleware.class";
import { LoggerMiddleware } from "../Middleware/logger.middleware";
import { NumberCommand } from "../Commands/number.command";
import { DeleteCommand } from "../Commands/delete.command";
import { PollCommand } from "../Commands/poll.command";

export class BaseBot {
    bot: Telegraf<IBotContext>; //пустая переменная для бота и его тип, с которым будет работать юхер
    commands: Command[] =[] //массив BOT-команд, которые будет выполняться до bot.launch
    middlewares: Middleware[] =[] //массив посредников, которые будет выполняться до выполнения команд бота

    constructor(private readonly configService: IConfigService) {
        // забираем конфиг из .env и инициализируем бота
        this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"))
        
        // записываем все наши действия в sessions.json
        this.bot.use((new LocalSession({database: 'sessions.json'})).middleware())
    }

    // инициализация бота
    init() {
        this.middlewares = [
            new LoggerMiddleware(this.bot)
        ]

        // сюда добавляем новые команды для выполнения ботом
        this.commands = [
            new StartCommand(this.bot),
            new PollCommand(this.bot),
            new DeleteCommand(this.bot),
            new NumberCommand(this.bot),
            new MessageCommand(this.bot),
        ]
        
        // выполняем все миддлвары до запуска команд бота
        for(const middleware of this.middlewares) {
            middleware.handle()
        }

        // пробегаемся циклом по всем командами и вызываем их скрипт (описан в handler у каждого)
        for(const command of this.commands) {
            command.handle()
        }
        this.bot.launch()
    }

}
