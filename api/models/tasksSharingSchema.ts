import mongoose, { Schema, Document } from 'mongoose';

export interface MathTaskModel extends Document {
  taskArgs: number[];
  taskActions?: string[];
  readableTask: string;
  result: number;
  variants: number[];
}

const MathTaskSchema: Schema = new Schema({
  taskArgs: {
    type: [Number],
    required: [true, 'Task arguments are required']
  },
  taskActions: {
    type: [String],
    required: false
  },
  readableTask: {
    type: String,
    required: [true, 'Readable task description is required'],
    trim: true
  },
  result: {
    type: Number,
    required: [true, 'Result is required']
  },
  variants: {
    type: [Number],
    required: [true, 'Answer variants are required']
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

const TasksCollectionSchema: Schema = new Schema({
  tasks: {
    type: [MathTaskSchema],
    required: [true, 'Tasks array is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
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

// Add indexes for better query performance
TasksCollectionSchema.index({ 'tasks.result': 1 });
TasksCollectionSchema.index({ 'tasks.taskArgs': 1 });

export default mongoose.model('TasksCollection', TasksCollectionSchema);
