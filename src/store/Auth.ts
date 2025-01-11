import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type IAuthState = {
  token: string | null;
  hydrated: boolean;
};

type IAuthAction = {
  setHydrated(): void;
  setToken(token: string): void;
};

export type IAuthStore = IAuthAction & IAuthState;

export const authStore: StateCreator<IAuthStore> = (set) => ({
  token: null,
  hydrated: false,
  setHydrated() {
    set({ hydrated: true });
  },
  setToken(token) {
    set({ token: token });
  },
});
