import { useState } from 'react';
import { ApiService } from '../api/ApiService';
import { LeaderboardResponseDto } from '../types/common.types';

export const useLeaderBoard = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardResponseDto | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLeaderboard = async (userId: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await ApiService.getLeaderboard(userId);
            setLeaderboard(response);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    };

    return { leaderboard, loading, error, fetchLeaderboard };
}