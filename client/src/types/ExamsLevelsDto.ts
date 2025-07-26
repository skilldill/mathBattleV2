export type ExamLevelDto = {
    level: number;
    difficulty: string;
    questionCount: number;
    timeSeconds: number;
    maxMistakes: number;
}

export type ExamLevelPlayedDto = {
    userId: string;
    totalTimeSeconds: number;
    totalMistakes: number;
} & ExamLevelDto;
