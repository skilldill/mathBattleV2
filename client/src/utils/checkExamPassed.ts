import { ExamLevelDto } from "../types/ExamsLevelsDto";
import { ResultDto } from "../types/MathTaskDto";

export const checkExamPassed = (result: ResultDto, examLevel: ExamLevelDto) => {
    const mistakes = result.tasks.filter((task) => task.result !== task.answer).length;
    return mistakes <= examLevel.maxMistakes;
}