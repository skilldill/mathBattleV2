const BASE_RATING = 1000;
const SPEED_COEF = 15;

export const getRating = async (
    tasksCount: number, 
    tasksResolvedCount: number, 
    totalTime: number, 
    baseRating = BASE_RATING,
    speedCoef = SPEED_COEF,
) => {
    const accuracy = tasksResolvedCount / tasksCount;
    const avgTimePerTask = (totalTime / 1000) / tasksCount;
    const speedMultiplier = speedCoef / avgTimePerTask;

    const rating = Math.round(baseRating * accuracy * speedMultiplier);
    return rating;
}
