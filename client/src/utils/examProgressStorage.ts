import { ExamLevelPlayedDto } from "../types/ExamsLevelsDto";

const EXAM_PROGRESS_STORAGE_KEY = 'schoolExamProgress';
export const LOCAL_BROWSER_EXAM_USER_ID = 'local-browser-user';

declare global {
    interface Window {
        Telegram?: {
            WebApp?: {
                initData?: string;
                initDataUnsafe?: {
                    user?: {
                        id?: number | string;
                    };
                };
            };
        };
    }
}

export const isTelegramGameSession = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('u91x') && params.get('x_3z9')) {
        return true;
    }

    const initData = window.Telegram?.WebApp?.initData;
    const initUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

    return Boolean(initUserId || initData);
}

export const getStoredExamLevelPlayed = (): ExamLevelPlayedDto[] => {
    if (typeof window === 'undefined' || !window.localStorage) {
        return [];
    }

    const storedProgress = window.localStorage.getItem(EXAM_PROGRESS_STORAGE_KEY);
    if (!storedProgress) {
        return [];
    }

    try {
        const parsedProgress = JSON.parse(storedProgress);
        return Array.isArray(parsedProgress) ? parsedProgress : [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const saveStoredExamLevelPlayed = (examLevelPlayed: ExamLevelPlayedDto): ExamLevelPlayedDto[] => {
    const currentProgress = getStoredExamLevelPlayed();
    const updatedProgress = currentProgress.filter((level) => level.level !== examLevelPlayed.level);

    updatedProgress.push(examLevelPlayed);
    updatedProgress.sort((a, b) => a.level - b.level);

    if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(EXAM_PROGRESS_STORAGE_KEY, JSON.stringify(updatedProgress));
    }

    return updatedProgress;
}
