import { Elysia } from 'elysia'
import { connectDB } from './config/database'
import { mathService, DIFFICULTIES_LIST } from './services/mathService'
import { ResultModel } from './models/resultSchema'

// Connect to MongoDB
connectDB()

const app = new Elysia()

// Healthcheck endpoint
app.get('/api/health', () => ({
  status: 'ok',
  timestamp: new Date().toISOString()
}))

app.get('/api/math-tasks-difficulties', () => {
  return DIFFICULTIES_LIST;
})

app.post('/api/math-tasks', ({ body }) => {
  const { count, difficulty } = body;
  const tasks = mathService.getTasksList(count, difficulty);
  return tasks;
})

app.post('/api/result', async ({ body }) => {
  const { tasks, time, userId, difficulty } = body;
  console.log(tasks, time, userId, difficulty);
  const result = new ResultModel({
    tasks,
    time,
    userId,
    difficulty
  });
  const savedResult = await result.save();

  return { id: savedResult.id };
})

app.get('/api/result/:id', async ({ params }) => {
  const { id } = params;
  const result = await ResultModel.findById(id);
  return result;
})

app.get('/api/results/:userId', async ({ params }) => {
  const { userId } = params;
  const results = await ResultModel.find({ userId });
  const formattedResults = results.map(result => ({
    taskCount: result.tasks.length,
    time: result.time,
    difficulty: result.difficulty,
    date: result.createdAt,
    id: result.id
  }));
  return formattedResults;
})

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
app.listen(port)

console.log(`🦊 Math Server is running at ${app.server?.hostname}:${app.server?.port}`)