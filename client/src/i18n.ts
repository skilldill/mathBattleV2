import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      settingRatingGameScreenTitle: '🏆 Rating Game',
      ratingGameStartButtonText: '🏆 To the top of the leaderboard!',
      topMathematiciansRatingTitle: 'Top Mathematicians 👩‍🎓',
      topMathematiciansRatingContent: 'The leaderboard will be here soon...',
      finish: 'Finish',
      actionSheetFinishTitle: 'Are you sure you want to finish the game without saving your results?',
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
      ratingGame: 'Rating Game',
      checkYourself: 'Check Yourself',
      leaderboard: 'Leaderboard',
      continueSolving: 'Continue solving exercises',
      solvingExercisesTitle: 'Solving exercises',
      startTrainingGame: 'Let\'s go!',
    }
  },
  ru: {
    translation: {
      settingRatingGameScreenTitle: '🏆 Рейтинговая игра',
      ratingGameStartButtonText: '🏆 На вершину рейтинга!',
      topMathematiciansRatingTitle: 'Топ математиков 👩‍🎓',
      topMathematiciansRatingContent: 'Скоро здесь будет таблица лидеров...',
      finish: 'Завершить',
      actionSheetFinishTitle: 'Ты уверен, что хочешь завершить игру без сохранения результатов?',

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
      ratingGame: 'Рейтинговая игра',
      checkYourself: 'Проверить себя',
      leaderboard: 'Таблица лидеров',
      continueSolving: 'Продолжить решать примеры',
      solvingExercisesTitle: 'Решение примеров',
      startTrainingGame: 'Полетели!',
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
    lng: 'ru',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

  // i18n.changeLanguage('ru');
export default i18n; 