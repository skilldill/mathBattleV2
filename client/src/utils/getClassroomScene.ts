import { ExamLevelPlayedDto } from "../types/ExamsLevelsDto";
import { randomInt } from "./randomInt";

const SCENES = [
    'astronomy',
    'space',
    'ninja',
    'chemistry',
    'hogwarts',
]

export const getClassroomScene = (passedLevels: ExamLevelPlayedDto[]) => {
    let randomScene = 0;

    if (passedLevels.find(level => level.level === 5)) {
        randomScene = randomInt(0, 1);
    }

    if (passedLevels.find(level => level.level === 10)) {
        randomScene = randomInt(0, 2);
    }

    if (passedLevels.find(level => level.level === 15)) {
        randomScene = randomInt(0, 4);
    }

    return SCENES[randomScene];
}