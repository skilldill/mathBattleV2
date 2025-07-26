import { ExamLevelPlayedDto } from "../types/ExamsLevelsDto";

export const findCurrentExamLevel = (examLevelsPlayed: ExamLevelPlayedDto[]) => {
    if (examLevelsPlayed.length === 0) {
        return 1;
    }
    const sortedLevels = examLevelsPlayed.sort((a, b) => a.level - b.level);
    return sortedLevels[sortedLevels.length - 1].level + 1;
}