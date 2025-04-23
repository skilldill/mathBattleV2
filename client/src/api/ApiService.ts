import { httpClient } from './httpClient';
import { MathTaskDto, SaveResultDto } from '../types/MathTaskDto';

export class ApiService {
    static async getMathTasks(count: number, difficulty: string): Promise<MathTaskDto[]> {
        const response = await httpClient.post('/api/math-tasks', { count, difficulty });
        return response.data;
    }

    static async getMathTasksDifficulties(): Promise<string[]> {
        const response = await httpClient.get('/api/math-tasks-difficulties');
        return response.data;
    }

    static async saveResult(result: SaveResultDto): Promise<{ id: string }> {
        const response = await httpClient.post('/api/save-result', result);
        return response.data;
    }
}