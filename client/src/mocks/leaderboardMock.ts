import { LeaderboardResponseDto } from '../types/common.types';

export const mockLeaderboard: LeaderboardResponseDto = {
    top10: [
        {
            userId: '1',
            username: 'math_genius',
            firstName: 'Alex',
            lastName: 'Smith',
            rating: 2500,
            tasksCount: 100,
            tasksResolvedCount: 95,
            totalTime: 3600000, // 1 hour in ms
            accuracy: 0.95,
            avgTimePerTask: 36,
            createdAt: '2024-03-20T10:00:00Z'
        },
        {
            userId: '2',
            username: 'number_ninja',
            firstName: 'Maria',
            lastName: 'Johnson',
            rating: 2450,
            tasksCount: 95,
            tasksResolvedCount: 90,
            totalTime: 3420000, // 57 minutes in ms
            accuracy: 0.947,
            avgTimePerTask: 38,
            createdAt: '2024-03-20T09:30:00Z'
        },
        {
            userId: '3',
            username: 'equation_master',
            firstName: 'John',
            lastName: 'Doe',
            rating: 2400,
            tasksCount: 90,
            tasksResolvedCount: 85,
            totalTime: 3240000, // 54 minutes in ms
            accuracy: 0.944,
            avgTimePerTask: 38.1,
            createdAt: '2024-03-20T09:00:00Z'
        },
        {
            userId: '4',
            username: 'math_wizard',
            firstName: 'Emma',
            lastName: 'Wilson',
            rating: 2350,
            tasksCount: 85,
            tasksResolvedCount: 80,
            totalTime: 3060000, // 51 minutes in ms
            accuracy: 0.941,
            avgTimePerTask: 38.2,
            createdAt: '2024-03-20T08:30:00Z'
        },
        {
            userId: '5',
            username: 'algebra_ace',
            firstName: 'David',
            lastName: 'Brown',
            rating: 2300,
            tasksCount: 80,
            tasksResolvedCount: 75,
            totalTime: 2880000, // 48 minutes in ms
            accuracy: 0.938,
            avgTimePerTask: 38.4,
            createdAt: '2024-03-20T08:00:00Z'
        },
        {
            userId: '6',
            username: 'geometry_guru',
            firstName: 'Sophia',
            lastName: 'Miller',
            rating: 2250,
            tasksCount: 75,
            tasksResolvedCount: 70,
            totalTime: 2700000, // 45 minutes in ms
            accuracy: 0.933,
            avgTimePerTask: 38.6,
            createdAt: '2024-03-20T07:30:00Z'
        },
        {
            userId: '7',
            username: 'calculus_king',
            firstName: 'Michael',
            lastName: 'Davis',
            rating: 2200,
            tasksCount: 70,
            tasksResolvedCount: 65,
            totalTime: 2520000, // 42 minutes in ms
            accuracy: 0.929,
            avgTimePerTask: 38.8,
            createdAt: '2024-03-20T07:00:00Z'
        },
        {
            userId: '8',
            username: 'trig_titan',
            firstName: 'Olivia',
            lastName: 'Garcia',
            rating: 2150,
            tasksCount: 65,
            tasksResolvedCount: 60,
            totalTime: 2340000, // 39 minutes in ms
            accuracy: 0.923,
            avgTimePerTask: 39,
            createdAt: '2024-03-20T06:30:00Z'
        },
        {
            userId: '9',
            username: 'stats_sage',
            firstName: 'William',
            lastName: 'Rodriguez',
            rating: 2100,
            tasksCount: 60,
            tasksResolvedCount: 55,
            totalTime: 2160000, // 36 minutes in ms
            accuracy: 0.917,
            avgTimePerTask: 39.3,
            createdAt: '2024-03-20T06:00:00Z'
        },
        {
            userId: '10',
            username: 'math_maestro',
            firstName: 'Isabella',
            lastName: 'Martinez',
            rating: 2050,
            tasksCount: 55,
            tasksResolvedCount: 50,
            totalTime: 1980000, // 33 minutes in ms
            accuracy: 0.909,
            avgTimePerTask: 39.6,
            createdAt: '2024-03-20T05:30:00Z'
        }
    ],
    userPlace: 3,
    userData: {
        userId: '3',
        username: 'equation_master',
        firstName: 'John',
        lastName: 'Doe',
        rating: 2400,
        tasksCount: 90,
        tasksResolvedCount: 85,
        totalTime: 3240000,
        accuracy: 0.944,
        avgTimePerTask: 38.1,
        createdAt: '2024-03-20T09:00:00Z'
    }
}; 