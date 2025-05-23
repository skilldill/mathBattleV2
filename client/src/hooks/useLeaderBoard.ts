import { useState } from 'react';
import { ApiService } from '../api/ApiService';
import { LeaderboardResponseDto } from '../types/common.types';

export const useLeaderBoard = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardResponseDto | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [alreadyPlayedToday, setAlreadyPlayedToday] = useState<boolean>(false);

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

    const fetchResults = async (userId: string) => {
        const response = await ApiService.getResultsByUserId(userId);
        return response;
    }

    const checkAlreadyPlayedToday = async (userId: string) => {
        const results = await fetchResults(userId);
        const ratingResults = results.filter(result => result.isRating);
        if (ratingResults.length > 0) {
            const lastResult = ratingResults[0];
            const today = new Date().toISOString().split('T')[0];
            setAlreadyPlayedToday(lastResult.date.split('T')[0] === today);
        }
    }

    return { leaderboard, loading, error, fetchLeaderboard, alreadyPlayedToday, checkAlreadyPlayedToday };
}