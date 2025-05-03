import mongoose from 'mongoose';
import { UserModel } from './models/userSchemas';
import { ResultModel } from './models/resultSchema';
import { v4 as uuidv4 } from 'uuid';

const mongoUri = 'mongodb://localhost:27017/math'; // Замените на ваш URI

const difficulties = ['easy', 'medium', 'hard'];
const languages = ['en', 'ru', 'es', 'de', 'fr'];

const generateRandomTask = () => {
  const correctAnswer = Math.floor(Math.random() * 10);
  const isCorrect = Math.random() > 0.3;
  return {
    task: `Task #${Math.floor(Math.random() * 1000)}`,
    result: correctAnswer,
    answer: isCorrect ? correctAnswer : correctAnswer + 1,
    time: Math.floor(Math.random() * 10) + 1, // 1–10 сек
  };
};

const seed = async () => {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  await UserModel.deleteMany({});
  await ResultModel.deleteMany({});

  await UserModel.create({
    userId: '123',
    username: `SkillDill`,
    firstName: `Skill`,
    lastName: `Dill`,
    language: 'ru',
  });
  
  await UserModel.create({
    userId: '321',
    username: `Tania`,
    firstName: `Tania`,
    lastName: `Skill`,
    language: 'ru',
  });
  
  await UserModel.create({
    userId: '111',
    username: `Pestel`,
    firstName: `Pestel`,
    lastName: `Dill`,
    language: 'ru',
  });

  for (let i = 1; i <= 10; i++) {
    const userId = uuidv4();
    const user = await UserModel.create({
      userId,
      username: `user${i}`,
      firstName: `First${i}`,
      lastName: `Last${i}`,
      language: languages[i % languages.length],
    });

    const taskCount = Math.floor(Math.random() * 6) + 5; // 5–10 задач
    const tasks = Array.from({ length: taskCount }, generateRandomTask);
    const totalTime = tasks.reduce((sum, t) => sum + t.time, 0);

    await ResultModel.create({
      userId,
      isRating: true,
      tasks,
      time: totalTime,
      difficulty: difficulties[i % difficulties.length],
      createdAt: new Date(), // Сегодняшняя дата
    });
  }

  console.log('Mock data successfully inserted');
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Error seeding data:', err);
  mongoose.disconnect();
});