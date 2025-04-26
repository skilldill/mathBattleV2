import { useState, useEffect } from 'react';
import { ApiService } from '../api/ApiService';
import { MathTaskDto, MathTaskResultDto } from '../types/MathTaskDto';
import { useTimer } from './useTimer';
import { useHistory } from 'react-router';
import { Answer } from '../types/common.types';
import { combineTasksWithAnswers } from '../utils/combineTasksWithAnswers';
import { useUserStore } from '../store/userStore';

export const useMathTasks = () => {
    const [tasks, setTasks] = useState<MathTaskDto[]>([]);
    const [difficulties, setDifficulties] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [difficulty, setDifficulty] = useState<string>('easy');
    const [isRating, setIsRating] = useState<boolean>(false);
    const history = useHistory();
    const userId = useUserStore((state) => state.userId);

    useEffect(() => {
        if (tasks.length > 0 && answers.length === tasks.length) {
            saveResult(isRating);
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

    const saveResult = async (isRating: boolean = false) => {
        setLoading(true);
        const resultForSave = combineTasksWithAnswers(tasks, answers);

        const data = await ApiService.saveResult({
            tasks: resultForSave,
            userId: userId || 'common',
            time: getTime(),
            difficulty,
            isRating
        });

        try {
            history.push('/puzzles-result/' + data.id);
        } catch (err) {
            setError('Failed to save result');
        } finally {
            setLoading(false);
        }
    }

    return { tasks, difficulties, error, loading, fetchTasks, fetchDifficulties, checkAnswer, saveResult, setIsRating };
};
