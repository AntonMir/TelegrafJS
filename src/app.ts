import { Telegraf } from "telegraf";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import LocalSession from "telegraf-session-local";
import { MessageCommand } from "./commands/message.command";

class Bot {
    bot: Telegraf<IBotContext>; //пустая переменная для бота и его тип, с которым будет работать юхер
    commands: Command[] =[] //массив BOT-команд, которые будет выполняться до bot.launch

    constructor(private readonly configService: IConfigService) {
        // забираем конфиг из .env и инициализируем бота
        this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"))
        
        // записываем все наши действия в sessions.json
        this.bot.use((new LocalSession({database: 'sessions.json'})).middleware())
    }

    // инициализация бота
    init() {

        // сюда добавляем новые команды для выполнения ботом
        this.commands = [
            new StartCommand(this.bot),
            new MessageCommand(this.bot)
        ]

        // пробегаемся циклом по всем командами и вызываем их скрипт (описан в handler у каждого)
        for(const command of this.commands) {
            command.handle()
        }
        this.bot.launch()
    }

}

const bot = new Bot(new ConfigService())
bot.init()
