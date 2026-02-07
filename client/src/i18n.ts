import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      play: 'Play',
      finish: 'Finish',
      actionSheetFinishTitle: 'Are you sure you want to finish the game without saving your results?',
      defaultUsername: 'математик',
      mathBattle: 'Math Battle',
      statistics: 'Statistics',
      results: 'Results',
      toHome: 'To Home',
      chooseDifficulty: 'Choose difficulty',
      baby: '👶 Baby - 10 exercises',
      schoolboy: '👦 Schoolboy - 10 exercises',
      student: '👨‍🎓 Student - 15 exercises',
      ninja: '🥷 Ninja - 20 exercises, from easy to hard',
      babyStatus: '👶 Baby',
      schoolboyStatus: '👦 Schoolboy',
      studentStatus: '👨‍🎓 Student',
      ninjaStatus: '🥷 Ninja',
      greeting: 'Hello, {{userName}}!',
      inDevelopment: 'In development...',
      toBack: 'To Back',
      checkYourself: 'Check Yourself',
      leaderboard: 'Leaderboard',
      continueSolving: 'Continue solving exercises',
      solvingExercisesTitle: 'Solving exercises',
      startTrainingGame: 'Let\'s go!',
      playerTitleScreen: '📊 Your personal results',
      share: 'Share',
      successCopiedToClipboard: 'Successfully copied to clipboard ✅',
      // Rating game
      toLeaderboard: 'To Leaderboard',
      ratingGameButtonText: '🏆 Rating Game',
      trainingGameButtonText: '👩‍🏫 Training Game',
      settingRatingGameScreenTitle: '🏆 Rating Game',
      ratingGameStartButtonText: '🏆 To the top of the leaderboard!',
      topMathematiciansRatingTitle: 'Top Mathematicians 👩‍🎓',
      ratingGame: 'Rating Game',
      topMathematiciansRatingContent: '🛠 The leaderboard will be here soon...',
      ratingGameDescription: [
        '🏆 You can play once per day to compete in the leaderboard!',
        '20 exercises with different difficulty, from easy to really tough. Your goal: solve the exercises as fast as you can, but don\'t forget about accuracy!',
        '⚡️ Your daily result will appear on the leaderboard. Come back tomorrow to improve your ranking!',
        '⚠️ If you play for the first time, try to solve the exercises from "Check Yourself" first. ⚠️',
      ],
      alreadyPlayedToday: 'You have already played the rating game today!',
      comeBackTomorrow: 'Come back tomorrow to improve your score!',

      // Result card
      resultCardTotalExercisesFieldTitle: 'Total exercises',
      resultCardCorrectAnswersFieldTitle: 'Correct answers',
      resultCardIncorrectAnswersFieldTitle: 'Incorrect answers',
      resultCardAccuracyFieldTitle: 'Accuracy',
      resultCardTotalTimeFieldTitle: 'Total time',
      resultCardAverageTimeFieldTitle: 'Average time',
      resultCardAnswerFieldTitle: 'Your answer',
      resultCardTimeFieldTitle: 'Time',
      resultCardOpenButtonText: 'Open',
      resultCardDifficultyFieldTitle: 'Difficulty',
      resultCardTotalErrorsFieldTitle: 'Total errors',
      resultCardTotalCorrectAnswersFieldTitle: 'Total correct answers',
      // units
      timeSecondsUnit: 'sec',
      timeMinutesUnit: 'min',
      timeHoursUnit: 'h',
      // leaderboard
      leaderboardPlace: 'Place',
      leaderboardAccuracy: 'Accuracy',
      leaderboardTasksCompleted: 'Tasks completed',
      leaderboardAverageTime: 'Average time',
      leaderboardTotalTime: 'Total time',
      leaderboardTotalErrors: 'Total errors',
      leaderboardTotalCorrectAnswers: 'Total correct answers',
      // ratings screen
      yourRating: 'Your rating',
      place: 'Place',
      accuracy: 'Accuracy',
      tasksCompleted: 'Tasks completed',
      averageTime: 'Average time',
      totalTime: 'Total time',

      // tasks share block
      tasksShareBlockButtonText: 'Share tasks',
      tasksShareBlockDescription: 'Share the tasks with your friends to challenge them!',
      textForShare: 'I solved {{tasksCount}} math puzzles in @MathlyBattleBot in {{time}} seconds. Try to beat my score!',
      textSharePointerForHandleCopy: 'Just copy this message 👇 and send it to your friend in Telegram:',
      noTasksAvailable: 'No tasks available',
      attentionCheckSharingMessage: 'Check your bot\'s chat, there\'s a message you can send to your friend to try solving the puzzles!',

      // school exam
      schoolExamButtonText: '🏫 School Exam',
      chessButtonText: 'Chess with friends',
      chessInfoModalTitle: 'New Online Chess',
      chessInfoModalDescription: 'Play chess online with your friends on chesson.me! Challenge your friends and improve your chess skills together!',
      chessInfoModalButtonText: 'Play Chess',
      chessInfoModalCloseText: 'Close',
      schoolExamStart: 'School exam starts in',
      exam: 'Exam',
      schoolExam: 'School Exam',
      selectPerson: 'Select person',
      selectExamLevel: 'Select exam level',
      toSelectPerson: 'To select person',
      timeIsUp: 'Time is up!',
      didntPassExam: "You didn't pass the exam.",
      toLeave: 'To leave',
      passedExam: 'You passed the exam!',
      later: 'Later',
      schoolExamDescription: `🎓 Help MathBattle students pass math exams!
You have limited time and a list of exercises to solve without errors.
Each exam is a challenge: the further you go, the harder it gets!
Pass exams, earn stars and unlock new heroes! ✨`,
      examRetry: 'To retake the exam',
    }
  },
  ru: {
    translation: {
      play: 'Играть',
      finish: 'Завершить',
      actionSheetFinishTitle: 'Ты уверен, что хочешь завершить игру без сохранения результатов?',
      defaultUsername: 'математик',
      mathBattle: 'Math Battle',
      statistics: 'Статистика',
      results: 'Результаты',
      toHome: 'На главную',
      chooseDifficulty: 'Выбери сложность',
      baby: '👶 Малыш - 10 примеров',
      schoolboy: '👦 Школьник - 10 примеров',
      student: '👨‍🎓 Студент - 15 примеров',
      ninja: '🥷 Ниндзя - 20 примеров, от простых до сложных',
      babyStatus: '👶 Малыш',
      schoolboyStatus: '👦 Школьник',
      studentStatus: '👨‍🎓 Студент',
      ninjaStatus: '🥷 Ниндзя',
      greeting: 'Привет, {{userName}}!',
      inDevelopment: 'В разработке...',
      checkYourself: 'Проверить себя',
      leaderboard: 'Таблица лидеров',
      continueSolving: 'Продолжить решать примеры',
      solvingExercisesTitle: 'Решение примеров',
      startTrainingGame: 'Полетели!',
      playerTitleScreen: '📊 Твои личные результаты',
      share: 'Поделиться',
      successCopiedToClipboard: 'Успешно скопировано в буфер обмена ✅',
      // Rating game
      toLeaderboard: 'В таблицу лидеров',
      ratingGameButtonText: '🏆 Рейтинговая игра',
      trainingGameButtonText: '👩‍🏫 Тренировочная игра',
      settingRatingGameScreenTitle: '🏆 Рейтинговая игра',
      ratingGameStartButtonText: '🏆 На вершину рейтинга!',
      topMathematiciansRatingContent: '🛠Скоро здесь будет таблица лидеров...',
      ratingGame: 'Рейтинговая игра',
      topMathematiciansRatingTitle: 'Топ математиков 👩‍🎓',
      ratingGameDescription: [
        '🏆 Ты можешь играть один раз в день, чтобы сравниться с другими математиками!',
        '20 примеров с разной сложностью, от простых до сложных. Твоя цель: решить примеры как можно быстрее, но не забывай про точность!',
        '⚡️ Твой ежедневный результат будет отображаться в таблице лидеров. Вернись завтра, чтобы улучшить свое место!',
        '⚠️ Если ты играешь впервые, попробуй сначала решить примеры из "Проверь себя" ⚠️',
      ],
      alreadyPlayedToday: 'Ты уже сыграл рейтинговую игру сегодня!',
      comeBackTomorrow: 'Приходи завтра, чтобы улучшить свой результат!',

      // Result card
      resultCardTotalExercisesFieldTitle: 'Всего примеров',
      resultCardCorrectAnswersFieldTitle: 'Правильно решено',
      resultCardIncorrectAnswersFieldTitle: 'Неправильно решено',
      resultCardTotalTimeFieldTitle: 'Время решения',
      resultCardAverageTimeFieldTitle: 'Среднее время',
      resultCardAnswerFieldTitle: 'Твой ответ',
      resultCardTimeFieldTitle: 'Время выполнения',
      resultCardDifficultyFieldTitle: 'Сложность',
      resultCardTotalErrorsFieldTitle: 'Всего ошибок',
      resultCardTotalCorrectAnswersFieldTitle: 'Правильно решено',
      resultCardOpenButtonText: 'Открыть',
      // units
      timeSecondsUnit: 'сек',
      timeMinutesUnit: 'мин',
      timeHoursUnit: 'ч',
      // leaderboard
      leaderboardPlace: 'Место',
      leaderboardAccuracy: 'Точность',
      leaderboardTasksCompleted: 'Выполнено заданий',
      leaderboardAverageTime: 'Среднее время',
      leaderboardTotalTime: 'Всего времени',
      leaderboardTotalErrors: 'Всего ошибок',
      leaderboardTotalCorrectAnswers: 'Всего правильно решено',
      // ratings screen
      yourRating: 'Твой рейтинг',
      place: 'Место',
      accuracy: 'Точность',
      tasksCompleted: 'Выполнено заданий',
      averageTime: 'Среднее время',
      totalTime: 'Всего времени',
      // tasks share block
      tasksShareBlockButtonText: 'Поделиться примерами',
      tasksShareBlockDescription: 'Поделись примерами с друзьями, чтобы они тоже могли попробовать их решить!',
      textForShare: 'Я решил {{tasksCount}} математических примеров в @MathlyBattleBot за {{time}} секунд. Попробуй решить быстрее!',
      textSharePointerForHandleCopy: 'Просто скопируй это сообщение 👇 и кинь другу в Телеграм:',
      noTasksAvailable: 'Нет доступных заданий',
      attentionCheckSharingMessage: 'Проверь свой чат с ботом, там сообщение, которое ты можешь отправить другу, чтобы он тоже смог попробовать решить примеры!',

      // school exam
      schoolExamButtonText: '🏫 Школьный экзамен',
      chessButtonText: 'Шахматы с друзьями',
      chessInfoModalTitle: 'Новые шахматы онлайн',
      chessInfoModalDescription: 'Играй в шахматы онлайн с друзьями на chesson.me! Бросай вызов друзьям и улучшай свои навыки игры в шахматы вместе!',
      chessInfoModalButtonText: 'Играть в шахматы',
      chessInfoModalCloseText: 'Закрыть',
      schoolExamStart: 'Экзамен начнется через',
      exam: 'Экзамен',
      schoolExam: 'Школьный экзамен',
      selectPerson: 'Выбери персонажа',
      selectExamLevel: 'Выбери экзамен',
      toSelectPerson: 'Выбрать персонажа',
      timeIsUp: 'Время вышло!',
      didntPassExam: 'Вы не сдали экзамен.',
      toLeave: 'Уйти',
      later: 'Позже',
      passedExam: 'Вы сдали экзамен!',
      schoolExamDescription: `🎓 Помоги студентам MathBattle сдать экзамены по математике!
        У тебя есть ограниченное время и список примеров, которые нужно решить без ошибок.
        Каждый экзамен — это вызов: чем дальше, тем сложнее!
        Сдавай экзамены, зарабатывай звёзды и открывай новых героев! ✨`,
      examRetry: 'Пересдать экзамен',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

  // i18n.changeLanguage('ru');
export default i18n; 