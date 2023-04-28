import { Context, Markup, Telegraf } from "telegraf";
import { IConfigService } from "../Config/config.interface";
import { IBotContext } from "../Context/context.interface";
import LocalSession from "telegraf-session-local";
import { ChatMemberUpdated } from "typegram";


export class SubscriptionBot {
    bot: Telegraf

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf(this.configService.get("BOT_ADMIN_TOKEN"))
        this.bot.use((new LocalSession({database: 'sessions.json'})).middleware())
    }

    // инициализация бота
    init() {

        this.bot.on('message', async ctx => {

        //     // const chatId = ctx.chat.id

            const userId = ctx.message.from.id
            console.log('userId', userId)

        //     // const pass = await ctx.getChatMember(chatId)
        //     // console.log(pass)

            const remotePass = await ctx.telegram.getChatMember('@R34AntonTestChannel', userId)

        //     console.log('remotePass', remotePass)
        //     // status: 
        //     //  'left' - не подписан
        //     //  'member' - подписан
        //     //  'creator' - создатель канала
        //     //  'administrator' - админ канала
        })

        this.bot.on('chat_member', ctx => {
            // const chat = await ctx.chatMember.cha

            console.log('from', ctx.from)
            console.log('chat', ctx.chat)

        })

        
        
       

        



        this.bot.launch()
    }

}

// Иди в локальную среду создай там бота и тупо nodejs
// И изучи вопрос как отрекать подписку и отписку от канала (бот должен быть в его админах)
// Посмотри на модель данных которая придет поделись информацией со мной потом расскажу про внедрение к флоу трекеру

// 1. Создать канад
// 2. добавить бота в его Админы
// 3. Подписать и отписать пользователя на канал
// 4. Зафиксировать модель данных которая придет




// from: {
//     id: 6104370733,
//     is_bot: false,
//     first_name: 'Р34-🔒Антон',
//     username: 'r34_anton',


// from: {
//     id: 850929920,
//     is_bot: false,
//     first_name: 'Anton',
//     username: 'ant_che_comm',


// user: {
//     id: 1202568386,
//     is_bot: false,
//     first_name: 'Антон',
//     last_name: 'Черноусов',
//     username: 'antonChernousov115',