import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { aauthStore, authStore, IAuthStore } from "./Auth";
import { hydrate } from "@tanstack/react-query";
import { hhydarteStore, hydarteStore, IHydrateStore } from "./hydrate";

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
            // if (!error) state?.setHydrated();
          };
        },
      }
    )
  )
);

export interface CombinedState {
  auth: IAuthStore;
  hydrate: IHydrateStore;
}

export type StateSlice<T> = StateCreator<
  CombinedState,
  [["zustand/immer", never]],
  [["zustand/persist", Partial<T>]],
  T
>;

export const useStore = create<CombinedState>()(
  persist(
    immer((...api) => ({
      auth: aauthStore(...api),
      hydrate: hhydarteStore(...api),
    })),
    {
      name: "my-store-name",
    }
  )
);
