import { StateCreator } from "zustand";
import { TGameStatus } from "../../game-types";

export interface GameStatusSlice {
  status: TGameStatus;
  setStatus: (status: TGameStatus) => void;
}

export const gameStatusSlice: StateCreator<GameStatusSlice> = (set) => ({
  status: "NOT_STARTED",
  setStatus: (status) => set({ status: status }),
});
