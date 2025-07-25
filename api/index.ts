import { Elysia } from 'elysia'
import { connectDB } from './config/database'
import { mathService, DIFFICULTIES_LIST } from './services/mathService'
import { ResultModel } from './models/resultSchema'
import TasksCollection from './models/tasksSharingSchema'
import { UserModel } from './models/userSchemas'
import fs from 'fs'
import path from 'path'
import { ExamLevelModel } from './models/examLevelSchema'
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

// TODO: кэшировать данные
// считать таймстамп, если данные устарели, то пересчитать
app.get('/api/common/stats', async () => {
  const totalUsers = await UserModel.countDocuments();
  const totalResults = await ResultModel.countDocuments(); // всего партий
  const totalTasks = await ResultModel.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: { $size: "$tasks" } }
      }
    }
  ]).then(result => result[0]?.total || 0);
  
  return {
    totalUsers,
    totalResults,
    totalTasks,
  }
})

app.post('/api/math-tasks', ({ body }) => {
  const { count, difficulty } = body;
  const tasks = mathService.getTasksList(count, difficulty);
  return tasks;
})

app.post('/api/result', async ({ body }) => {
  const { tasks, time, userId, difficulty, isRating, tasksCollectionId } = body;

  const result = new ResultModel({
    tasks,
    time,
    userId,
    difficulty,
    isRating,
    tasksCollectionId: tasksCollectionId || null
  });
  const savedResult = await result.save();

  return { id: savedResult.id };
})

app.post('/api/result-rating', async ({ body }) => {
  const { tasks, time, userId, difficulty } = body;
  console.log(tasks, time, userId, difficulty);
  const result = new ResultModel({
    tasks,
    time,
    userId,
    difficulty,
    isRating: true
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
  const results = await ResultModel.find({ userId }).sort({ createdAt: -1 });
  const formattedResults = results.map(result => ({
    taskCount: result.tasks.length,
    time: result.time,
    difficulty: result.difficulty,
    date: result.createdAt,
    id: result.id,
    totalErrors: result.tasks.filter(task => task.answer !== task.result).length,
    totalCorrectAnswers: result.tasks.filter(task => task.answer === task.result).length,
    isRating: result.isRating
  }));
  return formattedResults;
})

app.get('/api/daily-rating/:userId', async ({ params }) => {
  const { userId } = params;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const aggregationPipeline = [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "userId",
        as: "userInfo"
      }
    },
    {
      $unwind: {
        path: "$userInfo",
        preserveNullAndEmptyArrays: false
      }
    },
    {
      $match: {
        isRating: true,
        createdAt: { $gte: startOfToday, $lte: endOfToday },
      }
    },
    {
      $addFields: {
        tasksCount: { $size: "$tasks" },
        tasksResolvedCount: {
          $size: {
            $filter: {
              input: "$tasks",
              as: "task",
              cond: { $eq: ["$$task.answer", "$$task.result"] }
            }
          }
        }
      }
    },
    {
      $addFields: {
        accuracy: { $divide: ["$tasksResolvedCount", "$tasksCount"] },
        avgTimePerTask: { $divide: ["$time", "$tasksCount"] },
        totalTime: "$time",
        rating: {
          $round: [
            {
              $cond: {
                if: { $lt: [{ $divide: ["$tasksResolvedCount", "$tasksCount"] }, 0.75] },
                then: {
                  $multiply: [
                    100,
                    { $divide: ["$tasksResolvedCount", "$tasksCount"] },
                    { $divide: [15, { $divide: ["$time", "$tasksCount"] }] }
                  ]
                },
                else: {
                  $multiply: [
                    1000,
                    { $divide: ["$tasksResolvedCount", "$tasksCount"] },
                    { $divide: [15, { $divide: ["$time", "$tasksCount"] }] }
                  ]
                }
              }
            },
            0
          ]
        }
      }
    },
    { $sort: { rating: -1 } },
    {
      $project: {
        _id: 0,
        userId: 1,
        username: "$userInfo.username",
        firstName: "$userInfo.firstName",
        lastName: "$userInfo.lastName",
        rating: 1,
        tasksCount: 1,
        tasksResolvedCount: 1,
        totalTime: 1,
        accuracy: { $round: ["$accuracy", 2] },
        avgTimePerTask: { $round: ["$avgTimePerTask", 2] },
        createdAt: 1
      }
    }
  ];

  // Выполняем агрегирование
  const fullResults = await ResultModel.aggregate(aggregationPipeline);

  // Берем топ-10
  const top10 = fullResults.slice(0, 10);

  let userPlace = null;
  let userData = null;

  if (userId) {
    const index = fullResults.findIndex(result => result.userId === userId);
    if (index !== -1) {
      userPlace = index + 1;
      userData = fullResults[index];
    }
  }

  return {
    top10,
    userPlace,
    userData
  };
})

app.get('/api/leaderboard', async () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const aggregationPipeline = [
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "userId",
        as: "userInfo"
      }
    },
    {
      $unwind: {
        path: "$userInfo",
        preserveNullAndEmptyArrays: false
      }
    },
    {
      $match: {
        isRating: true,
        createdAt: { $gte: startOfToday, $lte: endOfToday },
      }
    },
    {
      $addFields: {
        tasksCount: { $size: "$tasks" },
        tasksResolvedCount: {
          $size: {
            $filter: {
              input: "$tasks",
              as: "task",
              cond: { $eq: ["$$task.answer", "$$task.result"] }
            }
          }
        }
      }
    },
    {
      $addFields: {
        accuracy: { $divide: ["$tasksResolvedCount", "$tasksCount"] },
        avgTimePerTask: { $divide: ["$time", "$tasksCount"] },
        totalTime: "$time",
        rating: {
          $round: [
            {
              $cond: {
                if: { $lt: [{ $divide: ["$tasksResolvedCount", "$tasksCount"] }, 0.75] },
                then: {
                  $multiply: [
                    100,
                    { $divide: ["$tasksResolvedCount", "$tasksCount"] },
                    { $divide: [15, { $divide: ["$time", "$tasksCount"] }] }
                  ]
                },
                else: {
                  $multiply: [
                    1000,
                    { $divide: ["$tasksResolvedCount", "$tasksCount"] },
                    { $divide: [15, { $divide: ["$time", "$tasksCount"] }] }
                  ]
                }
              }
            },
            0
          ]
        }
      }
    },
    { $sort: { rating: -1 } },
    {
      $project: {
        _id: 0,
        userId: 1,
        username: "$userInfo.username",
        firstName: "$userInfo.firstName",
        lastName: "$userInfo.lastName",
        rating: 1,
        tasksCount: 1,
        tasksResolvedCount: 1,
        totalTime: 1,
        accuracy: { $round: ["$accuracy", 2] },
        avgTimePerTask: { $round: ["$avgTimePerTask", 2] },
        createdAt: 1
      }
    }
  ];

  // Выполняем агрегирование
  const fullResults = await ResultModel.aggregate(aggregationPipeline);

  // Берем топ-10
  const top10 = fullResults.slice(0, 10);

  return top10;
})

app.post('/api/result/:id/share', async ({ params }) => {
  const { id } = params;
  
  // Find the result by ID
  const result = await ResultModel.findById(id);
  if (!result) {
    throw new Error('Result not found');
  }

  // Check if tasks collection already exists
  const existingCollection = await TasksCollection.findById(id);
  if (existingCollection) {
    return { id: existingCollection.id };
  }

  // Convert tasks to TasksCollection format
  const readableTasks = result.tasks.map(task => ({ task: task.task, result: task.result }));

  const tasks = mathService.getTasksFromReadable(readableTasks);

  // Create new TasksCollection with the same ID as the result
  const tasksCollection = new TasksCollection({
    _id: id,
    tasks,
    difficulty: result.difficulty
  });

  // Save the collection
  const savedCollection = await tasksCollection.save();

  // Return the ID of the created collection
  return { id: savedCollection.id };
})

app.get('/api/tasks-collection/:id', async ({ params }) => {
  const { id } = params;
  const tasksCollection = await TasksCollection.findById(id);
  console.log(tasksCollection?.difficulty);
  return tasksCollection;
})

app.get('/api/exams-levels', async () => {
  const examsLevelsFileData = Bun.file("./filesConfigs/examsLevels.json");
  const examsLevels = await examsLevelsFileData.json();
  return examsLevels;
})

app.get('/api/exam-level-played/:userId', async ({ params }) => {
  const { userId } = params;
  const examLevel = await ExamLevelModel.find({ userId });
  return examLevel;
})

app.post('/api/exam-level-played', async ({ body }) => {
  const { userId, level, difficulty, questionCount, timeSeconds, maxMistakes } = body;
  const examLevel = new ExamLevelModel({ userId, level, difficulty, questionCount, timeSeconds, maxMistakes });
  const savedExamLevel = await examLevel.save();
  return savedExamLevel;
})

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
app.listen(port)

console.log(`🦊 Math Server is running at ${app.server?.hostname}:${app.server?.port}`)