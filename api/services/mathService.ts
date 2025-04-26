export const MATH_PLUS = '+';
export const MATH_MINUS = '-';
export const MATH_MULTIPLY = '*';
export const MATH_DIVISION = '/';

export const SIMPLE_ACTIONS_NAMES_LIST = ['plus', 'minus'];
export const ALL_ACTIONS_NAMES_LIST = ['plus', 'minus', 'multiply', 'divide'];
type Difficulty = 'easy' | 'medium' | 'hard' | 'combo';

export const DIFFICULTIES_LIST = ['easy', 'medium', 'hard', 'combo'];

export const SYMBOLS_ACTIONS_MAP: Record<string, string> = {
    plus: MATH_PLUS,
    minus: MATH_MINUS,
    multiply: MATH_MULTIPLY,
    divide: MATH_DIVISION,
};

export const FN_ALL_ACTIONS_MAP: Record<string, (a: number, b: number) => number> = {
    plus: (a, b) => a + b,
    minus: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => parseFloat((a / b).toFixed(2)),
};

// ==== Random Utilities ====

export function getRandomPositiveInt(max: number) {
    return Math.round(Math.random() * max);
}

export function getRandomNegativeInt(absMax: number) {
    return 0 - getRandomPositiveInt(absMax);
}

export function getRandomBoolean() {
    return getRandomPositiveInt(1) === 1;
}

export function getRandomListNumbers(countNumbers: number, absMax: number) {
    const numbersList: number[] = [];

    for (let i = 0; i < countNumbers; i++) {
        numbersList.push(getRandomPositiveInt(absMax));
    }

    return numbersList; // сортировка по желанию
}

export function getRandomMathActionName(actionNames: string[]) {
    const random = getRandomPositiveInt(actionNames.length - 1);
    return actionNames[random];
}

export function getRandomPositiveIfNotIn(argsList: number[], max: number) {
    let random = getRandomPositiveInt(max);

    while (argsList.includes(random)) {
        random += 1;
    }

    return random;
}

// ==== Types ====

export type MathTask = {
    taskArgs: number[];
    taskActions?: string[];
    readableTask: string;
    result: number;
    variants: number[];
};

// ==== Core Service ====

export class MathTasksService {
    getResultVariants(result: number): number[] {
        const isDecimal = result % 1 !== 0;
        const variants: number[] = [NaN, NaN, NaN, NaN];
        const resultIndex = getRandomPositiveInt(variants.length - 1);
        variants[resultIndex] = result;
    
        for (let i = 0; i < variants.length; i++) {
            if (!isNaN(variants[i])) continue;
    
            let delta = getRandomPositiveInt(10) - 5;
            if (isDecimal) {
                delta += Math.random();
                delta = parseFloat(delta.toFixed(2)); // округляем дельту, чтобы она тоже выглядела "красиво"
            }
    
            let variant = result + delta;
            variant = parseFloat(variant.toFixed(2));
    
            variant = getRandomPositiveIfNotIn(variants, Math.abs(Math.round(variant)));
    
            if (isDecimal) {
                variant += Math.random();
                variant = parseFloat(variant.toFixed(2));
            }
    
            variants[i] = variant;
        }
    
        return variants;
    }

    getTaskResult(taskArgs: number[], taskActions: string[]): number {
        const result = taskArgs.reduce((prev, current, i) => {
            if (i === 0) return current;
            const fn = FN_ALL_ACTIONS_MAP[taskActions[i - 1]];
            return fn(prev, current);
        }, 0);

        const cleanResult = parseFloat(result.toFixed(2));
        return cleanResult === -0 ? 0 : cleanResult;
    }

    getReadableTask(taskArgs: number[], taskActions: string[]): string {
        const readableTask = taskArgs.reduce((prev, current, i) => {
            if (i === 0) return current;

            const symbolAction = SYMBOLS_ACTIONS_MAP[taskActions[i - 1]];
            const needBrackets =
                (symbolAction === MATH_MULTIPLY || symbolAction === MATH_DIVISION) &&
                (`${prev}`.includes(MATH_PLUS) || `${prev}`.includes(MATH_MINUS));

            if (needBrackets) {
                return `(${prev}) ${symbolAction} ${current}`;
            }

            return `${prev} ${symbolAction} ${current}`;
        }, '');

        return readableTask;
    }

    getRandomTask(options: { countArgs: number; absMax: number; actionsNames: string[] }): MathTask {
        const { countArgs, absMax, actionsNames } = options;

        const taskArgs = getRandomListNumbers(countArgs, absMax);
        const taskActions = [];

        for (let i = 0; i < countArgs - 1; i++) {
            taskActions.push(getRandomMathActionName(actionsNames));
        }

        taskActions.forEach((action, i) => {
            if (action === 'divide' && taskArgs[i + 1] === 0) {
                taskArgs[i + 1] = getRandomPositiveIfNotIn(taskArgs, absMax);
            }
        });

        const result = this.getTaskResult(taskArgs, taskActions);
        const readableTask = this.getReadableTask(taskArgs, taskActions);
        const variants = this.getResultVariants(result);

        return {
            taskArgs,
            taskActions,
            result,
            readableTask,
            variants,
        };
    }

    getTasksList(tasksCount: number, difficulty: Difficulty = 'combo'): MathTask[] {
        const tasks: MathTask[] = [];

        const createTask = (countArgs: number, absMax: number, actionsNames: string[]) => {
            return this.getRandomTask({ countArgs, absMax, actionsNames });
        };

        if (difficulty === 'combo') {
            const third = Math.floor(tasksCount / 3);

            for (let i = 0; i < tasksCount; i++) {
                if (i < third) {
                    tasks.push(createTask(2, 30, SIMPLE_ACTIONS_NAMES_LIST)); // easy
                } else if (i < 2 * third) {
                    tasks.push(createTask(3, 25, ALL_ACTIONS_NAMES_LIST)); // medium
                } else {
                    tasks.push(createTask(4, 20, ALL_ACTIONS_NAMES_LIST)); // hard
                }
            }

            return tasks;
        }

        // Конкретные уровни
        switch (difficulty) {
            case 'easy':
                for (let i = 0; i < tasksCount; i++) {
                    tasks.push(createTask(2, 30, SIMPLE_ACTIONS_NAMES_LIST));
                }
                break;
            case 'medium':
                for (let i = 0; i < tasksCount; i++) {
                    tasks.push(createTask(3, 25, ALL_ACTIONS_NAMES_LIST));
                }
                break;
            case 'hard':
                for (let i = 0; i < tasksCount; i++) {
                    tasks.push(createTask(4, 20, ALL_ACTIONS_NAMES_LIST));
                }
                break;
        }

        return tasks;
    }
}

export const mathService = new MathTasksService();