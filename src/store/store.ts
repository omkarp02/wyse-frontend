import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { authStore, IAuthStore } from "./auth";

type IBoundStore = IAuthStore;

export const useBoundStore = create<IBoundStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...authStore(...a),
      })),
      {
        name: "store",
        onRehydrateStorage() {
          return (state, error) => {
            if (!error) state?.setHydrated();
          };
        },
      }
    )
  )
);
