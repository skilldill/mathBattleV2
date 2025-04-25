import { create } from "zustand";

type TasksStore = {
    count: number | undefined;
    difficulty: string | undefined;
    setCreateParams: (count: number, difficulty: string) => void;
}

export const useTasksStore = create<TasksStore>((set) => ({
    count: undefined,
    difficulty: undefined,
    setCreateParams: (count: number, difficulty: string) => set({ count, difficulty }),
}));
