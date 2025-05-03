export type Answer = {
    answer: number;
    time: number;
}

export type LeaderboardDto = {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    rating: number;
    tasksCount: number;
    tasksResolvedCount: number;
    totalTime: number;
    accuracy: number;
    avgTimePerTask: number;
    createdAt: string;
}

export type LeaderboardResponseDto = {
    top10: LeaderboardDto[];
    userPlace: number;
    userData: LeaderboardDto;
}