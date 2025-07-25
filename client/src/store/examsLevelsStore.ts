import { create } from "zustand";
import { ExamLevelDto } from "../types/ExamsLevelsDto";

type ExamsLevelsStore = {
    selectedExamLevel: ExamLevelDto | null;
    setSelectedExamLevel: (selectedExamLevel: ExamLevelDto) => void;
}

export const useExamsLevelsStore = create<ExamsLevelsStore>((set) => ({
    selectedExamLevel: null,
    setSelectedExamLevel: (selectedExamLevel: ExamLevelDto) => set({ selectedExamLevel }),
}));
