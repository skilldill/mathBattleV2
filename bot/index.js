const { config } = require('dotenv');
const { Telegraf } = require('telegraf');

config();

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
console.log('🤖 Math Battle Bot работает!')
