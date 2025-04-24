import { create } from "zustand";

type UserStore = {
  userName: string | undefined;
  userId: string | undefined;
  setUserData: (userName: string, userId: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userName: undefined,
  userId: undefined,
  setUserData: (userName: string, userId: string) => set({ userName, userId }),
}));
