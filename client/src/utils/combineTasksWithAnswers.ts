import { Answer } from "../types/common.types";
import { MathTaskDto, MathTaskResultDto } from "../types/MathTaskDto";


export const combineTasksWithAnswers = (tasks: MathTaskDto[], answers: Answer[]): MathTaskResultDto[] => {
    console.log(tasks, answers);
    return tasks.map((task, index) => {
        const { readableTask, result } = task;
        const { answer, time } = answers[index];

        return {
            task: readableTask,
            result,
            answer,
            time
        };
    });
}