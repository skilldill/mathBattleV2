import { useState } from 'react';
import { ApiService } from '../api/ApiService';
import { MathTaskDto } from '../types/MathTaskDto';

export const useMathTasks = () => {
    const [tasks, setTasks] = useState<MathTaskDto[]>([]);
    const [difficulties, setDifficulties] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [answers, setAnswers] = useState<number[]>([]);

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

    return { tasks, difficulties, error, loading, fetchTasks, fetchDifficulties, checkAnswer };
};
