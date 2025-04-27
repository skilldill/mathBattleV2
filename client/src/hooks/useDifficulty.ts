import { useTranslation } from "react-i18next";

export const useDifficulty = () => {
    const { t } = useTranslation();

    const difficultyMap = {
        'easy-light': t('baby'),
        'easy': t('schoolboy'),
        'medium': t('student'),
        'combo': t('ninja'),
    }

    const getDifficulty = (difficulty: string) => {
        return difficultyMap[difficulty as keyof typeof difficultyMap];
    }

    return { getDifficulty };
}