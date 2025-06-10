import axios from 'axios';

export const httpClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const botHttpClient = axios.create({
    baseURL: '/bot',
    headers: {
        'Content-Type': 'application/json',
    },
});
