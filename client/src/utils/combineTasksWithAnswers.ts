import { Answer } from "../types/common.types";
import { MathTaskDto, MathTaskResultDto } from "../types/MathTaskDto";


export const combineTasksWithAnswers = (tasks: MathTaskDto[], answers: Answer[]): MathTaskResultDto[] => {
    console.log(tasks, answers);
    const mergedTasks: MathTaskResultDto[] = [];

    for (let i in tasks) {
        if (!answers[i]) break;
        
        const { readableTask, result } = tasks[i];
        const { answer, time } = answers[i];

        mergedTasks.push({
            task: readableTask,
            result,
            answer,
            time
        });
    }

    return mergedTasks;
}