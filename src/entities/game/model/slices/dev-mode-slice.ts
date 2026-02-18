import { StateCreator } from "zustand";

export interface DevModeSlice {
  isOnDev: boolean;
  setIsOnDev: () => void;
}

export const devModeSlice: StateCreator<DevModeSlice> = (set) => ({
  isOnDev: false,

  setIsOnDev: () => set((state) => ({ isOnDev: !state.isOnDev })),
});
