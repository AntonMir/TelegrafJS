import { ConfigService } from "./Config/config.service";
import { BaseBot } from './Bots/base.bot'
import { SubscriptionBot } from "./Bots/subscription.bot";
import { Telegraf, Input } from "telegraf";
import { GetUpdateContent, NarrowedContext, Context } from "telegraf/typings/context";
import { Update } from "typegram";
import path from 'path'


// Бот для изучения основ
// const bot = new BaseBot(new ConfigService())
// bot.init()

// const photo = '../storageItems/5QDoon59tEqxsSvKd.jpeg'

// Бот для тестирования подписок и отписок на канал
// const bot = new SubscriptionBot(new ConfigService())
const bot = new Telegraf("5929680355:AAGpCkWNCq-bFhCbXjfmikIGYWu3GFnz5GQ")
bot.start( (ctx, next) => {
    // await ctx.telegram.sendMessage(ctx.chat.id, 'messageee')
    // // ctx.telegram.sendPhoto(ctx.chat.id, Input.fromLocalFile(photo)).catch(e => console.log(e))
    // await ctx.replyWithPhoto({source: photo}).catch(e => console.log(e))
    ctx.replyWithPhoto({ source: path.join(process.cwd(), 'storageItems', 'cat.jpeg')})
    next()
})

bot.use(ctx => ctx.replyWithVideo({ source: path.join(process.cwd(), 'storageItems', 'sample-10s.mp4')}))

bot.hears('/pic', ctx=> {
    // bot.telegram.sendPhoto(ctx.chat.id,
    //   {url: photo},
    //   {caption: "Hello"}
    // );
    // ctx.sendPhoto(photo, {caption: "I'm a bot!"});



    // const result = StorageItems.findOne({_id: '5QDoon59tEqxsSvKd'})
    ctx.replyWithPhoto({ source: path.join(process.cwd(), 'storageItems', 'cat.jpeg')})
    ctx.replyWithVideo({ source: path.join(process.cwd(), 'storageItems', 'sample-10s.mp4')})

});
// bot.on('chat_member', async (ctx) => {
    // console.log('from', ctx.update.chat_member.from)
    // console.log('chat', ctx.update.chat_member.chat)
    // console.log('old_chat_member', ctx.update.chat_member.old_chat_member)
    // console.log('new_chat_member', ctx.update.chat_member.new_chat_member)

    // const chat = await ctx.telegram.getChat(ctx.update.chat_member.chat.id)


   
// })
// bot.use(ctx => {
//     console.log(ctx)
// })
bot.launch({
    // allowedUpdates: ["callback_query", 'message', 'chat_member']
})


// chat_member: {
//     chat: [Object],
//     from: [Object],
//     date: 1681824490,
//     old_chat_member: [Object],
//     new_chat_member: [Object]
//   }



