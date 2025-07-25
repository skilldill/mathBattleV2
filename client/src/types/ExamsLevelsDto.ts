export type ExamLevelDto = {
    level: number;
    difficulty: string;
    questionCount: number;
    timeSeconds: number;
}

export type ExamLevelPlayedDto = {
    userId: string;
    totalTimeSeconds: number;
    totalMistakes: number;
} & ExamLevelDto;
