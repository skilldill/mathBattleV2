const { config } = require('dotenv');
const { Telegraf } = require('telegraf');
const { START_MESSAGE_MAP, QUESTION_MESSAGE_MAP, BUTTON_MESSAGE_MAP, MESSAGE_BUTTON_TEXT } = require('./constants');
const mongoose = require('mongoose');
const { ResultModel } = require('./dbModels');

config();

const MONGO_URI = process.env.MONGODB_URI;


const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_ID = process.env.ADMIN_ID;

export async function connectDB() {
  try {
    console.log('Connecting to MongoDB', process.env.MONGODB_URI);
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://mongodb:27017/math';
    await mongoose.connect(mongoUrl);
    console.log('📦 Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}
// Вызываем функцию подключения
connectDB();

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

bot.command('users', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  try {
    const uniquePlayers = await ResultModel.aggregate([
      {
        $group: { _id: "$userId" }
      },
      {
        $project: { _id: 0, userId: "$_id" }
      },
      { $sort: { userId: 1 } } // сортируем по алфавиту (опционально)
    ]);

    if (uniquePlayers.length === 0) {
      return ctx.reply('Пока что нет игроков.');
    }

    const usersList = uniquePlayers.map((u, idx) => `${idx + 1}. ${u.userId}`).join('\n');

    await ctx.reply(`👥 Уникальные игроки:\n\n${usersList}`);
  } catch (error) {
    console.error('Ошибка при получении уникальных игроков:', error);
    await ctx.reply('Ошибка при получении списка игроков. Попробуйте позже!');
  }
})

bot.launch()
console.log('🤖 Math Battle Bot работает!')
