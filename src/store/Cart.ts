import { logoutApi } from "@/services/auth/user-account";
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
  logout(): void;
};

export type IAuthStore = IAuthAction & IAuthState;

export const cartStore: StateCreator<IAuthStore> = (set) => ({
  token: null,
  hydrated: false,
  setHydrated() {
    set({ hydrated: true });
  },
  setLoggedIn({ token }) {
    set({ token: token });
  },
  reset() {
    set(AUTH_INITIAL_STATE);
  },
  async logout() {
    await logoutApi();
    set(AUTH_INITIAL_STATE);
  },
});
