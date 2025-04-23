import { httpClient } from './httpClient';
import { MathTaskDto, MathTaskResultDto } from '../types/MathTaskDto';

export class ApiService {
    static async getMathTasks(count: number, difficulty: string): Promise<MathTaskDto[]> {
        const response = await httpClient.post('/api/math-tasks', { count, difficulty });
        return response.data;
    }

    static async getMathTasksDifficulties(): Promise<string[]> {
        const response = await httpClient.get('/api/math-tasks-difficulties');
        return response.data;
    }

    static async saveResult(result: MathTaskResultDto): Promise<{ id: string }> {
        const response = await httpClient.post('/api/save-result', result);
        return response.data;
    }
}