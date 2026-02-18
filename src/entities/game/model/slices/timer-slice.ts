import { StateCreator } from "zustand";
import { DEFAULT_TIMER_SECONDS } from "../../game-constants";

export interface TimerSlice {
  timerSeconds: number;
  isTimerActive: boolean;

  setTimerSeconds: (time: number | ((prev: number) => number)) => void;
  setIsTimerActive: (is: boolean) => void;
}

export const timerSlice: StateCreator<TimerSlice> = (set) => ({
  timerSeconds: DEFAULT_TIMER_SECONDS,
  isTimerActive: false,

  setTimerSeconds: (time) =>
    set((state) => ({
      timerSeconds:
        typeof time === "function" ? time(state.timerSeconds) : time,
    })),

  setIsTimerActive: (is) => set({ isTimerActive: is }),
});
