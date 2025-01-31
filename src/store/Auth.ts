import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const AUTH_INITIAL_STATE = {
  token: null,
};

type IAuthState = {
  token: string | null;
  hydrated: boolean;
};

type IAuthAction = {
  setHydrated(): void;
  setLoggedIn({ token }: { token: string }): void;
  reset(): void;
};

export type IAuthStore = IAuthAction & IAuthState;

export const authStore: StateCreator<IAuthStore> = (set) => ({
  token: null,
  hydrated: false,
  setHydrated() {
    set({ hydrated: true });
  },
  setLoggedIn({token}) {
    set({ token: token });
  },
  reset() {
    set(AUTH_INITIAL_STATE);
  },
});
