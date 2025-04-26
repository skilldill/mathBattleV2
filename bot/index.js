const { config } = require('dotenv');
const { Telegraf } = require('telegraf');
const { START_MESSAGE_MAP, QUESTION_MESSAGE_MAP, BUTTON_MESSAGE_MAP, MESSAGE_BUTTON_TEXT } = require('./constants');
config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_ID = process.env.ADMIN_ID;

const getUrlWebApp = (userId, username) => `https://app.math-battle.ru?u91x=${userId}&x_3z9=${username}`;


bot.start((ctx) => {
  const message = START_MESSAGE_MAP[ctx.from.language_code] || START_MESSAGE_MAP['en'];

  ctx.reply(message, {
    reply_markup: {
      inline_keyboard: [[{
        text: MESSAGE_BUTTON_TEXT[ctx.from.language_code] || MESSAGE_BUTTON_TEXT['en'],
        web_app: { url: getUrlWebApp(ctx.from.id, ctx.from.username) }
      }]],
      resize_keyboard: true
    }
  })

  if (ADMIN_ID) {
    bot.telegram.sendMessage(
      ADMIN_ID,
      `Новый пользователь подключился! 👨‍🎓\nИмя: ${ctx.from.first_name || ''} ${ctx.from.last_name || ''}\nUsername: @${ctx.from.username || 'нет'}\nID: ${ctx.from.id}`
    );
  }

  setTimeout(() => {
    const questionMessage = QUESTION_MESSAGE_MAP[ctx.from.language_code] || QUESTION_MESSAGE_MAP['en'];
    const buttonMessage = BUTTON_MESSAGE_MAP[ctx.from.language_code] || BUTTON_MESSAGE_MAP['en'];

    ctx.reply(questionMessage, {
      reply_markup: {
        keyboard: [[{
          text: buttonMessage,
          web_app: { url: getUrlWebApp(ctx.from.id, ctx.from.username) }
        }]],
        resize_keyboard: true
      }
    })
  }, 3000)
})

bot.launch()
console.log('🤖 Math Battle Bot работает!')
