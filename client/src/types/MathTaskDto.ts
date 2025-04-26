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
    isRating: boolean;
}

export type ResultDto = {
    id: string;
    userId: string;
    tasks: MathTaskResultDto[];
    time: number;
    difficulty: string;
    createdAt: string;
}

export type ResultListDto = {
    taskCount: number;
    time: number;
    difficulty: string;
    date: string;
    id: string;
}