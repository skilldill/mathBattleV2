import { useState } from 'react';
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
    
    const { startTimer, stopTimer, getTime } = useTimer();

    const fetchTasks = async (count: number, difficulty: string) => {
        try {
            setLoading(true);
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

    const checkAnswer = (answer: {answer: number, time: number}) => {
        setAnswers((answers) => [...answers, answer]);
    }

    const saveResult = async () => {
        stopTimer();
        setLoading(true);

        const result = combineTasksWithAnswers(tasks, answers);

        const data = await ApiService.saveResult({
            tasks: result,
            userId: '1',
            time: getTime(),
            difficulty: 'easy'
        });

        try {
            history.push('/puzzles-result' + data.id);
        } catch (err) {
            setError('Failed to save result');
        } finally {
            setLoading(false);
        }
    }

    return { tasks, difficulties, error, loading, fetchTasks, fetchDifficulties, checkAnswer, saveResult };
};
