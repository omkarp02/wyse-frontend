import { logoutApi } from "@/services/auth/user-account";
import { StateCreator } from "zustand";
import { IBoundStore, IMutators } from "./store";

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

export const authStore: StateCreator<
  IBoundStore,
  IMutators,
  [],
  IAuthStore
> = (set) => ({
  token: null,
  setLoggedIn({ token }) {
    set({ token: token });
  },
  reset() {
    set(AUTH_INITIAL_STATE);
  },
  async logout() {
    // await logoutApi();
    set({token: "", cartItems: [], totalCartItem: 0});
  },
});

// export const aauthStore: StateSlice<IAuthStore> = (set) => ({
//   token: null,
//   setLoggedIn({ token }) {
//     set((state) => {
//       state.auth.token = token;
//     });
//   },
//   reset() {
//     set((state) => (state.auth.token = ""));
//   },
//   async logout() {
//     await logoutApi();
//     set((state) => (state.auth.token = ""));
//   },
// });
