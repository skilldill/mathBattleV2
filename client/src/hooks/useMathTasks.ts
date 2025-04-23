import { useState } from 'react';
import { ApiService } from '../api/ApiService';
import { MathTaskDto } from '../types/MathTaskDto';
import { useTimer } from './useTimer';
import { useHistory } from 'react-router';

export const useMathTasks = () => {
    const history = useHistory();
    const [tasks, setTasks] = useState<MathTaskDto[]>([]);
    const [difficulties, setDifficulties] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [answers, setAnswers] = useState<number[]>([]);
    
    const { startTimer, stopTimer, getTime } = useTimer();

    const fetchTasks = async (count: number, difficulty: string) => {
        try {
            setLoading(true);
            const data = await ApiService.getMathTasks(count, difficulty);
            setTasks(data);
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

    const checkAnswer = (answer: number) => {
        setAnswers((answers) => [...answers, answer]);
    }

    const saveResult = async () => {
        setLoading(true);

        const result = {
            tasks: tasks,
            answers: answers,
            time: getTime()
        }
        try {
            const data = await ApiService.saveResult(result);
            history.push('/puzzles-result' + data.id);
        } catch (err) {
            setError('Failed to save result');
        } finally {
            setLoading(false);
        }
    }

    return { tasks, difficulties, error, loading, fetchTasks, fetchDifficulties, checkAnswer, saveResult };
};
