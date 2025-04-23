export type MathTaskDto = {
    taskArgs: number[];
    taskActions: string[];
    result: number;
    readableTask: string;
    variants: number[];
};

export type MathTaskResultDto = {
    tasks: MathTaskDto[];
    answers: number[];
    time: number;
}