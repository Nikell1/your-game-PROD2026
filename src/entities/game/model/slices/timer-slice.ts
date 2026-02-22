import { StateCreator } from "zustand";
import { DEFAULT_TIMER_SECONDS } from "../../game-constants";

export interface TimerSlice {
  timerSeconds: number;
  isTimerActive: boolean;
  isShowTimer: boolean;

  setTimerSeconds: (time: number | ((prev: number) => number)) => void;
  setIsTimerActive: (is: boolean) => void;
  setIsShowTimer: (bool: boolean) => void;
}

export const timerInitialState = {
  timerSeconds: DEFAULT_TIMER_SECONDS,
  isTimerActive: false,
  isShowTimer: false,
};

export const timerSlice: StateCreator<TimerSlice> = (set) => ({
  ...timerInitialState,

  setIsShowTimer: (bool) => set({ isShowTimer: bool }),

  setTimerSeconds: (time) =>
    set((state) => ({
      timerSeconds:
        typeof time === "function" ? time(state.timerSeconds) : time,
    })),

  setIsTimerActive: (is) => set({ isTimerActive: is }),
});
