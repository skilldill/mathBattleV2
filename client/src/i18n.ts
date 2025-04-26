import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
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
      
      checkYourself: 'Check Yourself',
      leaderboard: 'Leaderboard',
      continueSolving: 'Continue solving exercises',
      solvingExercisesTitle: 'Solving exercises',
      startTrainingGame: 'Let\'s go!',

      // Rating game
      settingRatingGameScreenTitle: '🏆 Rating Game',
      ratingGameStartButtonText: '🏆 To the top of the leaderboard!',
      topMathematiciansRatingTitle: 'Top Mathematicians 👩‍🎓',
      ratingGame: 'Rating Game',
      topMathematiciansRatingContent: 'The leaderboard will be here soon...',
      ratingGameDescription: '20 exercises with different difficulty, from easy to really tough. Your goal: solve the examples as fast as you can, but don\'t forget about accuracy!',

      // Result card
      resultCardTotalExercisesFieldTitle: 'Total exercises',
      resultCardCorrectAnswersFieldTitle: 'Correct answers',
      resultCardIncorrectAnswersFieldTitle: 'Incorrect answers',
      resultCardAccuracyFieldTitle: 'Accuracy',
      resultCardTotalTimeFieldTitle: 'Total time',
      resultCardAverageTimeFieldTitle: 'Average time',
      resultCardAnswerFieldTitle: 'Your answer',
      resultCardTimeFieldTitle: 'Time', 
      // units
      timeSecondsUnit: 'sec',
      timeMinutesUnit: 'min',
      timeHoursUnit: 'h',
    }
  },
  ru: {
    translation: {
      
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
      
      checkYourself: 'Проверить себя',
      leaderboard: 'Таблица лидеров',
      continueSolving: 'Продолжить решать примеры',
      solvingExercisesTitle: 'Решение примеров',
      startTrainingGame: 'Полетели!',

      // Rating game
      settingRatingGameScreenTitle: '🏆 Рейтинговая игра',
      ratingGameStartButtonText: '🏆 На вершину рейтинга!',
      topMathematiciansRatingContent: 'Скоро здесь будет таблица лидеров...',
      ratingGame: 'Рейтинговая игра',
      topMathematiciansRatingTitle: 'Топ математиков 👩‍🎓',
      ratingGameDescription: '20 примеров с разной сложностью, от простых до сложных. Твоя цель: решить примеры как можно быстрее, но не забывай про точность!',

      // Result card
      resultCardTotalExercisesFieldTitle: 'Всего примеров',
      resultCardCorrectAnswersFieldTitle: 'Правильно решено',
      resultCardIncorrectAnswersFieldTitle: 'Неправильно решено',
      resultCardTotalTimeFieldTitle: 'Время решения',
      resultCardAverageTimeFieldTitle: 'Среднее время',
      resultCardAnswerFieldTitle: 'Твой ответ',
      resultCardTimeFieldTitle: 'Время выполнения',

      // units
      timeSecondsUnit: 'сек',
      timeMinutesUnit: 'мин',
      timeHoursUnit: 'ч',
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