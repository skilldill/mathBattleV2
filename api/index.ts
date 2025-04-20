import { Elysia } from 'elysia'
import { connectDB } from './config/database'
import { mathService, DIFFICULTIES_LIST } from './services/mathService'

// Connect to MongoDB
connectDB()

const app = new Elysia()

// Healthcheck endpoint
app.get('/health', () => ({
  status: 'ok',
  timestamp: new Date().toISOString()
}))

app.get('/math-tasks-difficulties', () => {
  return DIFFICULTIES_LIST;
})

app.post('/math-tasks', ({ body }) => {
  const { count, difficulty } = body;
  const tasks = mathService.getTasksList(count, difficulty);
  return tasks;
})

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
app.listen(port)

console.log(`🦊 Math Server is running at ${app.server?.hostname}:${app.server?.port}`)