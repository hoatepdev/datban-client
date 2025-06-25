import { UserParams } from "@/apis/users";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreState = {
  value: UserParams;
  setValue: (data: UserParams) => void;
};

export const useUserStore = create<StoreState>()(
  persist(
    (set) => ({
      value: {},
      setValue: (data: UserParams) => set({ value: data }),
    }),
    {
      name: "user",
    },
  ),
);

type S = {
  value: number;
  setValue: (newValue: number) => void;
};

export const useStore = create<S>()(
  persist(
    (set) => ({
      value: 0,
      setValue: (newValue: number) => set({ value: newValue }),
    }),
    {
      name: "my-app-storage1",
    },
  ),
);
