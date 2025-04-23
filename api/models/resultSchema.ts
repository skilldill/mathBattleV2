import mongoose from 'mongoose';


const TaskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  result: { type: Number, required: true },
  answer: { type: Number, required: true },
  time: { type: Number, required: true } // Время выполнения задачи, например, в секундах
}, {
  versionKey: false,
  toJSON: {
      virtuals: true,
      transform: (_, ret) => {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
          return ret;
      }
  }
});

const ResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tasks: { type: [TaskSchema], required: true },
  time: { type: Number, required: true }, // Общее время сессии
  difficulty: { type: String, required: true }, // Например: "easy", "medium", "hard"
  createdAt: { type: Date, default: Date.now },
}, {
  versionKey: false,
  toJSON: {
      virtuals: true,
      transform: (_, ret) => {
          ret.id = ret._id;
          ret.createdAt = ret.createdAt.toISOString().split('T')[0];
          delete ret._id;
          delete ret.__v;
          return ret;
      }
  }
});

export const ResultModel = mongoose.model('Result', ResultSchema); 