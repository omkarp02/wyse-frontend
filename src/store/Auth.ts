import { logoutApi } from "@/services/auth/user-account";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { StateSlice } from "./store";

const AUTH_INITIAL_STATE = {
  token: null,
};

type IAuthState = {
  token: string | null;
};

type IAuthAction = {
  setLoggedIn({ token }: { token: string }): void;
  reset(): void;
  logout(): void;
};

export type IAuthStore = IAuthAction & IAuthState;

export const authStore: StateCreator<IAuthStore> = (set) => ({
  token: null,
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

export const aauthStore: StateSlice<IAuthStore> = (set) => ({
  token: null,
  setLoggedIn({ token }) {
    set((state) => {
      state.auth.token = token;
    });
  },
  reset() {
    set((state) => (state.auth.token = ""));
  },
  async logout() {
    await logoutApi();
    set((state) => (state.auth.token = ""));
  },
});
