import { create } from "zustand";
import { ExamLevelDto } from "../types/ExamsLevelsDto";

type ExamsLevelsStore = {
    selectedExamLevel: ExamLevelDto | null;
    setSelectedExamLevel: (selectedExamLevel: ExamLevelDto) => void;
    selectedPerson: string | null;
    setSelectedPerson: (selectedPerson: string) => void;
    clearSelectedPerson: () => void;
}

export const useExamsLevelsStore = create<ExamsLevelsStore>((set) => ({
    selectedExamLevel: null,
    setSelectedExamLevel: (selectedExamLevel: ExamLevelDto) => set({ selectedExamLevel }),
    selectedPerson: null,
    setSelectedPerson: (selectedPerson: string) => set({ selectedPerson }),
    clearSelectedPerson: () => set({ selectedPerson: null }),
}));
