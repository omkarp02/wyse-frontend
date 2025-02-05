import { StateCreator } from "zustand";
import { IBoundStore, IMutators } from "./store";

export const IHYDRATE_INITIAL_STATE = {
  hydrated: false,
};

type IHydrateState = {
  hydrated: boolean;
};

type IHydrateAction = {
  setHydrated(): void;
};

export type IHydrateStore = IHydrateAction & IHydrateState;

export const hydarteStore: StateCreator<
  IBoundStore,
  IMutators,
  [],
  IHydrateStore
> = (set) => ({
  ...IHYDRATE_INITIAL_STATE,
  setHydrated() {
    set({ hydrated: true });
  },
});

// export const hhydarteStore: StateSlice<IHydrateStore> = (set) => ({
//   ...IHYDRATE_INITIAL_STATE,
//   setHydrated() {
//     set((state) => (state.hydrate.hydrated = true));
//   },
// });
