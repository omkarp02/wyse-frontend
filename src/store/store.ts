import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { hydarteStore, IHydrateStore } from "./hydrate";
import { authStore, IAuthStore } from "./auth-store";
import { cartStore, ICartStore } from "./cart-store";

export type IBoundStore = IAuthStore & IHydrateStore & ICartStore;

export type IMutators = [
  ["zustand/devtools", never],
  ["zustand/persist", unknown],
  ["zustand/immer", never]
];

export const useBoundStore = create<IBoundStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...authStore(...a),
        ...hydarteStore(...a),
        ...cartStore(...a),
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
