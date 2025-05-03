import { httpClient } from './httpClient';
import { MathTaskDto, ResultDto, ResultListDto, SaveResultDto } from '../types/MathTaskDto';
import { LeaderboardResponseDto } from '../types/common.types';

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
        const response = await httpClient.post('/api/result', result);
        return response.data;
    }

    static async getResultsByUserId(userId: string): Promise<ResultListDto[]> {
        const response = await httpClient.get(`/api/results/${userId}`);
        return response.data;
    }

    static async getResultById(id: string): Promise<ResultDto> {
        const response = await httpClient.get(`/api/result/${id}`);
        return response.data;
    }

    static async getLeaderboard(userId: string): Promise<LeaderboardResponseDto> {
        const response = await httpClient.get(`/api/daily-rating/${userId}`);
        return response.data;
    }
}