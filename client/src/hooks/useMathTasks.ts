import { useState, useEffect } from 'react';
import { ApiService } from '../api/ApiService';
import { MathTaskDto, MathTaskResultDto } from '../types/MathTaskDto';
import { useTimer } from './useTimer';
import { useHistory } from 'react-router';
import { Answer } from '../types/common.types';
import { combineTasksWithAnswers } from '../utils/combineTasksWithAnswers';

export const useMathTasks = () => {
    const history = useHistory();
    const [tasks, setTasks] = useState<MathTaskDto[]>([]);
    const [difficulties, setDifficulties] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [difficulty, setDifficulty] = useState<string>('easy');

    useEffect(() => {
        if (tasks.length > 0 && answers.length === tasks.length) {
            saveResult();
        }
    }, [answers]);

    const { startTimer, getTime } = useTimer();

    const fetchTasks = async (count: number, difficulty: string) => {
        try {
            setLoading(true);
            setDifficulty(difficulty);
            const data = await ApiService.getMathTasks(count, difficulty);
            setTasks(data);
            startTimer();    
        } catch (err) {
            setError('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const fetchDifficulties = async () => {
        try {
            const data = await ApiService.getMathTasksDifficulties();
            setDifficulties(data);
        } catch (err) {
            setError('Failed to fetch difficulties');
        }
    };

    const checkAnswer = (answer: Answer) => {
        console.log('answer', answer);
        setAnswers((answers) => [...answers, answer]);
    }

    const saveResult = async () => {
        setLoading(true);
        console.log('answers in saveResult', answers.length);
        const resultForSave = combineTasksWithAnswers(tasks, answers);

        const data = await ApiService.saveResult({
            tasks: resultForSave,
            userId: '1',
            time: getTime(),
            difficulty
        });

        try {
            history.push('/puzzles-result/' + data.id);
        } catch (err) {
            setError('Failed to save result');
        } finally {
            setLoading(false);
        }
    }

    return { tasks, difficulties, error, loading, fetchTasks, fetchDifficulties, checkAnswer, saveResult };
};
