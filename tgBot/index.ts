import { Telegraf } from './node_modules/telegraf/typings';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Запусти Math Battle', {
    reply_markup: {
      keyboard: [[{
        text: 'Открыть Math Battle',
        web_app: { url: 'https://app.math-battle.ru' }
      }]],
      resize_keyboard: true
    }
  })
})

bot.launch()
console.log('🤖 Бот работает!')
