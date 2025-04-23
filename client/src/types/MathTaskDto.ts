import { Answer } from './common.types';

export type MathTaskDto = {
    taskArgs: number[];
    taskActions: string[];
    result: number;
    readableTask: string;
    variants: number[];
};

export type MathTaskResultDto = {
    task: string;
    answer: number;
    time: number;
    result: number;
}

export type SaveResultDto = {
    tasks: MathTaskResultDto[];
    userId: string;
    time: number;
    difficulty: string;
}