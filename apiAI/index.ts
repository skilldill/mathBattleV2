import { Elysia } from 'elysia';
import { randomUUID } from 'crypto';

const AI_AUTH_URL = process.env.AI_AUTH_URL || '';
const AI_AUTH_SCOPE = process.env.AI_AUTH_SCOPE || '';
const AI_URL = process.env.AI_URL || '';
const AI_MODEL = process.env.AI_MODEL || '';
const AUTHORIZATION_KEY = process.env.AUTHORIZATION_KEY || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const app = new Elysia({ prefix: '/api-ai' });

const getMinutesSince = (createdAt: number) => {
    const now = Date.now();
    const diffMs = now - createdAt;
    const diffMinutes = diffMs / (1000 * 60);
    return diffMinutes;
}

function getAuthorizationHeader() {
    // const encoded = Buffer.from(`${CLIENT_ID}:${AUTHORIZATION_KEY}`).toString('base64')
    return `Basic ${AUTHORIZATION_KEY}`;
}

export const HEADERS_AUTH = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'RqUID': randomUUID(),
    'Authorization': getAuthorizationHeader(),
};

const authState = {
    token: '',
    createdAt: 0,
};

const fetchAuthToken = async () => {
    const body = new URLSearchParams({
        scope: AI_AUTH_SCOPE
    });

    try {
        const response = await fetch(AI_AUTH_URL, {
            method: 'POST',
            headers: HEADERS_AUTH,
            body,
        });

        const data = await response.json();

        authState.createdAt = Date.now();
        authState.token = data.access_token;

        return data;
    } catch (error) {
        console.error(error);
        return { error: error instanceof Error ? error.message : 'Unknown error' }
    }
}

const getAuthToken = async () => {
    if (authState.token.length > 0 && getMinutesSince(authState.createdAt) < 30) {
        return authState.token;
    }

    await fetchAuthToken();
    return authState.token;
}

// Необходимо продумать промпты для запросов
// И подумать над тем как отдавать примеры
// Запросы должны быть оптимизированы для отправки в модель
const fetchAiResponse = async (requestText: string, accessToken: string) => {
    const url = AI_URL;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };

    const body = JSON.stringify({
        model: AI_MODEL,
        messages: [
            {
                role: 'user',
                content: requestText
            }
        ],
        n: 1,
        stream: false,
        max_tokens: 512,
        repetition_penalty: 1,
        update_interval: 0
    });

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body
    });

    if (!response.ok) {
        const text = await response.text()
        throw new Error(`AI error: ${response.status} ${text}`)
    }

    const data = await response.json();
    return data;
}

app.post('/request', async ({ body }) => {
    await getAuthToken();
    const asnswer = await fetchAiResponse(body.request, authState.token);
    return asnswer;
})

app.listen(PORT);
console.log(`🦊 Math AI Server is running at ${app.server?.hostname}:${app.server?.port}`);