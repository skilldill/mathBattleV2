import { ExamLevelPlayedDto } from "../types/ExamsLevelsDto";

export const getDisabledPersonsForExam = (passedLevels: ExamLevelPlayedDto[]) => {
    if (passedLevels.find(level => level.level === 40)) {
        return [];
    }

    if (passedLevels.find(level => level.difficulty === 'hard')) {
        return ['professor', 'goose'];
    }
    if (passedLevels.find(level => level.difficulty === 'combo')) {
        return ['professor', 'goose','ninja',];
    }

    if (passedLevels.find(level => level.level === 5)) {
        return ['professor', 'goose', 'dragon', 'ninja'];
    }

    return ['professor', 'goose', 'dragon', 'ninja', 'pencil'];
}