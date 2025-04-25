import { create } from "zustand";

type TasksStore = {
    count: number;
    difficulty: string;
    setCreateParams: (count: number, difficulty: string) => void;
}

export const useTasksStore = create<TasksStore>((set) => ({
    count: 20,
    difficulty: 'combo',
    setCreateParams: (count: number, difficulty: string) => set({ count, difficulty }),
}));
