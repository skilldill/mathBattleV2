export function msToSeconds(ms: number): number {
    return parseFloat((ms / 1000).toFixed(1));
}

export function calculateAverageTimePerTask(time: number, tasksLength: number): string {
    return msToSeconds(time / tasksLength).toFixed(1);
}
