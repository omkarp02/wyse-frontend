import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type IAuthState = {
  jwt: string | null;
  hydrated: boolean;
};

type IAuthAction = {
  setHydrated(): void;
  setToken(token: string): void;
};

export const useAuthStore = create<IAuthState & IAuthAction>()(
  persist(
    immer((set) => ({
      jwt: null,
      hydrated: false,
      setHydrated() {
        set({ hydrated: true });
      },
      setToken(token) {
        set({ jwt: token });
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
