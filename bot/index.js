const { config } = require('dotenv');
const { Telegraf } = require('telegraf');

config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const START_MESSAGE = `
👋 Привет! Это Math Battle — арена для настоящих гениев чисел!

Сейчас ты можешь:
• 🧠 Тренироваться в решении примеров на скорость и точность

• 📊 Следить за своими личными результатами  

• 🏆 Совсем скоро — участвовать в ежедневных рейтингах  

• 🧮 И главное — доказать, что ты настоящий математик!

🚀 Готов начать?

Жми кнопку ниже и вступай в игру!`;

const getUrlWebApp = (userId, username) => `https://app.math-battle.ru?u91x=${userId}&x_3z9=${username}`;


bot.start((ctx) => {
  ctx.reply(START_MESSAGE, {
    reply_markup: {
      inline_keyboard: [[{
        text: 'ПОЛЕТЕЛИ!',
        web_app: { url: getUrlWebApp(ctx.from.id, ctx.from.username) }
      }]],
      resize_keyboard: true
    }
  })

  setTimeout(() => {
    ctx.reply('А ты точно математик? Сколько будет 2 + 2 * 2?', {
      reply_markup: {
        keyboard: [[{
          text: '🔥 Доказать, кто тут математик!',
          web_app: { url: getUrlWebApp(ctx.from.id, ctx.from.username) }
        }]],
        resize_keyboard: true
      }
    })
  }, 3000)
})

bot.launch()
console.log('🤖 Math Battle Bot работает!')
