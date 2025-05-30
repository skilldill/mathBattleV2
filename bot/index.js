import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import { START_MESSAGE_MAP, QUESTION_MESSAGE_MAP, BUTTON_MESSAGE_MAP, MESSAGE_BUTTON_TEXT, SHARED_TASKS_MESSAGE_MAP } from './constants';
import mongoose from 'mongoose';
import { ResultModel } from './db/ResultModel';
import { UserModel } from './db/UserModel';

config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_ID = process.env.ADMIN_ID;

const saveUserToDB = async ({ userId, username, firstName, lastName, language }) => {
  const user = await UserModel.findOne({ userId });
  if (user) return;
  await UserModel.create({ userId, username, firstName, lastName, language });
}

export function connectDB() {
  try {
    console.log('Connecting to MongoDB', process.env.MONGODB_URI);
    const mongoUrl = process.env.MONGODB_URI || 'mongodb://mongodb:27017/math';
    mongoose.connect(mongoUrl);
    console.log('📦 Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}
// Вызываем функцию подключения
connectDB();

const getUrlWebApp = (userId, username) => `https://app.math-battle.ru?u91x=${userId}&x_3z9=${username}`;
const getUrlWithSharedTasks = (userId, username, sharedTasksId) => `https://app.math-battle.ru?u91x=${userId}&x_3z9=${username}#/shared-puzzles/${sharedTasksId}`;

const openWebApp = async (ctx) => {
  if (!ctx || !ctx.from) return getUrlWebApp('', '');

  try {
    const user = await UserModel.findOne({ userId: ctx.from.id });
    if (!user) {
      await saveUserToDB({
        userId: ctx.from.id,
        username: ctx.from.username || 'математик',
        firstName: ctx.from.first_name || 'математик',
        lastName: ctx.from.last_name || 'математик',
        language: ctx.from.language_code || 'en'
      });

      if (ADMIN_ID) {
        bot.telegram.sendMessage(
          ADMIN_ID,
          `Новый пользователь подключился! 👨‍🎓\nИмя: ${ctx.from.first_name || ''} ${ctx.from.last_name || ''}\nUsername: @${ctx.from.username || 'нет'}\nID: ${ctx.from.id}`
        );
      }
    };
  } catch (error) {
    console.error('Ошибка при открытии WebApp:', error);
  }

  return getUrlWebApp(ctx.from.id, ctx.from.username);
}

bot.start(async (ctx) => {
  // шаблон для payload - id,time,tasksCount,correctAnswersCount
  const sharedTasksId = ctx.payload;
  
  // Ссылкой поделились с задачей
  if (sharedTasksId) {
    return ctx.reply(SHARED_TASKS_MESSAGE_MAP[ctx.from.language_code] || SHARED_TASKS_MESSAGE_MAP['en'], {
      reply_markup: {
        inline_keyboard: [[{
          text: MESSAGE_BUTTON_TEXT[ctx.from.language_code] || MESSAGE_BUTTON_TEXT['en'],
          web_app: { url: getUrlWithSharedTasks(ctx.from.id, ctx.from.username, sharedTasksId) }
        }]],
        resize_keyboard: true
      }
    });
  }

  const message = START_MESSAGE_MAP[ctx.from.language_code] || START_MESSAGE_MAP['en'];
  const url = await openWebApp(ctx);

  ctx.reply(message, {
    reply_markup: {
      inline_keyboard: [[{
        text: MESSAGE_BUTTON_TEXT[ctx.from.language_code] || MESSAGE_BUTTON_TEXT['en'],
        web_app: { url }
      }]],
      resize_keyboard: true
    }
  })

  await saveUserToDB({
    userId: ctx.from.id,
    username: ctx.from.username || 'математик',
    firstName: ctx.from.first_name || 'математик',
    lastName: ctx.from.last_name || 'математик',
    language: ctx.from.language_code || 'en'
  });

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
          web_app: { url }
        }]],
        resize_keyboard: true
        }
    })
  }, 3000)
})

bot.command('health', (ctx) => {
  if (`${ctx.from.id}` !== `${ADMIN_ID}`) return;
  ctx.reply('🔥 Math Battle Bot работает!')
})

bot.command('users', async (ctx) => {
  if (`${ctx.from.id}` !== `${ADMIN_ID}`) return;

  try {
    const users = await UserModel.find();
    const results = await ResultModel.aggregate([
      {
        $group: {
          _id: "$userId",
          gamesPlayed: { $sum: 1 }
        }
      }
    ]);

    // Create a map of userId to games played
    const gamesMap = results.reduce((acc, curr) => {
      acc[curr._id] = curr.gamesPlayed;
      return acc;
    }, {});

    if (users.length === 0) {
      ctx.reply('Пока что нет математиков в боте нет 🤖');
      return;
    }

    ctx.reply(users.map(user =>
      `👨‍🎓 ${user.username} ${user.firstName} ${user.lastName} ${user.language}\n🎮 Игр сыграно: ${gamesMap[user.userId] || 0}`
    ).join('\n\n'));
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    ctx.reply('Ошибка при получении пользователей. Попробуйте позже!');
  }
})

// bot.command('users', async (ctx) => {
//   if (`${ctx.from.id}` !== `${ADMIN_ID}`) return;

//   try {
//     const uniquePlayers = await ResultModel.aggregate([
//       {
//         $group: { _id: "$userId" }
//       },
//       {
//         $project: { _id: 0, userId: "$_id" }
//       },
//       { $sort: { userId: 1 } } // сортируем по алфавиту (опционально)
//     ]);

//     if (uniquePlayers.length === 0) {
//       return ctx.reply('Пока что нет игроков.');
//     }

//     const usersList = uniquePlayers.map((u, idx) => `${idx + 1}. ${u.userId}`).join('\n');

//     await ctx.reply(`👥 Уникальные игроки:\n\n${usersList}`);
//   } catch (error) {
//     console.error('Ошибка при получении уникальных игроков:', error);
//     await ctx.reply('Ошибка при получении списка игроков. Попробуйте позже!');
//   }
// })

bot.launch()
console.log('🤖 Math Battle Bot работает!')
