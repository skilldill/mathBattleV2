import mongoose from 'mongoose';

const ExamLevelSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    level: { type: Number, required: true },
    difficulty: { type: String, required: true },
    questionCount: { type: Number, required: true },
    timeSeconds: { type: Number, required: true },
    maxMistakes: { type: Number, required: true },
    totalTimeSeconds: { type: Number, required: true },
    totalMistakes: { type: Number, required: true },
});

export const ExamLevelModel = mongoose.model('ExamLevel', ExamLevelSchema);
