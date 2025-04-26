const START_MESSAGE_RU = `
👋 Привет! Это Math Battle — арена для настоящих гениев чисел!

Сейчас ты можешь:
• 🧠 Тренироваться в решении примеров на скорость и точность

• 📊 Следить за своими личными результатами  

• 🏆 Совсем скоро — участвовать в ежедневных рейтингах  

• 🧮 И главное — доказать, что ты настоящий математик!

🚀 Готов начать?

Жми кнопку ниже и вступай в игру!`;

const START_MESSAGE_EN = `
👋 Hi! This is Math Battle — the arena for true number geniuses!

Right now you can:
• 🧠 Train by solving math problems quickly and accurately

• 📊 Track your personal results

• 🏆 Very soon — compete in daily rankings

• 🧮 And most importantly — prove that you are a true mathematician!

🚀 Ready to start?

Click the button below to join the game!`;

const START_MESSAGE_MAP = {
    'ru': START_MESSAGE_RU,
    'en': START_MESSAGE_EN,
}

const QUESTION_MESSAGE_RU = `
А ты точно математик? Сколько будет 2 + 2 * 2?`;

const QUESTION_MESSAGE_EN = `
Are you a true mathematician? How much is 2 + 2 * 2?`;

const QUESTION_MESSAGE_MAP = {
    'ru': QUESTION_MESSAGE_RU,
    'en': QUESTION_MESSAGE_EN,
}

const BUTTON_MESSAGE_RU = `
🔥 Доказать, кто тут математик!`;

const BUTTON_MESSAGE_EN = `
🔥 Prove who is the true mathematician!`;

const BUTTON_MESSAGE_MAP = {
    'ru': BUTTON_MESSAGE_RU,
    'en': BUTTON_MESSAGE_EN,
}


const MESSAGE_BUTTON_TEXT = {
    'ru': 'ПОЛЕТЕЛИ!',
    'en': 'LET\'S GO!',
}

module.exports = {
    START_MESSAGE_MAP,
    QUESTION_MESSAGE_MAP,
    BUTTON_MESSAGE_MAP,
    MESSAGE_BUTTON_TEXT,
}