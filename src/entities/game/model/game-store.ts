import { IActivePlayer } from "@/entities/player";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  IGameQuestion,
  IThemeWithQuestions,
  TGameStatus,
} from "../game-types";
import { DEFAULT_TIMER_SECONDS } from "../game-constants";

interface GameStoreState {
  status: TGameStatus;
  players: IActivePlayer[];
  activePlayerId: number | null;
  prevActivePlayerId: number | null;
  currentQuestion: IGameQuestion | null;
  isOnDev: boolean;
  answeredQuestionsIds: string[];
  material: IThemeWithQuestions[];
  usedThemesIds: string[];
  usedQuestionsIds: string[];
  timerSeconds: number;
  isTimerActive: boolean;
}

interface GameStoreActions {
  setPlayers: (players: IActivePlayer[]) => void;
  setStatus: (status: TGameStatus) => void;
  setActivePlayerId: (id: number | null) => void;
  setPrevActivePlayerId: (id: number | null) => void;
  setCurrentQuestion: (question: IGameQuestion | null) => void;
  setIsOnDev: () => void;
  setAnsweredQuestionsIds: (answeredQuesitons: string[]) => void;
  setMaterial: (material: IThemeWithQuestions[]) => void;
  setUsedThemesIds: (newThemes: string[]) => void;
  setUsedQuestionsIds: (newQuestions: string[]) => void;
  setTimerSeconds: (time: number | ((prev: number) => number)) => void;
  resetStore: () => void;
  setIsTimerActive: (is: boolean) => void;
}

const initialState: GameStoreState = {
  status: "NOT_STARTED",
  players: [],
  material: [],
  activePlayerId: null,
  currentQuestion: null,
  isOnDev: false,
  answeredQuestionsIds: [],
  usedThemesIds: [],
  usedQuestionsIds: [],
  timerSeconds: DEFAULT_TIMER_SECONDS,
  isTimerActive: false,
  prevActivePlayerId: null,
};

interface IGameStore extends GameStoreState, GameStoreActions {}

export const useGameStore = create<IGameStore>()(
  persist(
    (set) => ({
      ...initialState,

      setIsTimerActive: (is) => set({ isTimerActive: is }),

      setTimerSeconds: (time) =>
        set((state) => ({
          timerSeconds:
            typeof time === "function" ? time(state.timerSeconds) : time,
        })),

      resetStore: () => set({ ...initialState }),

      setIsOnDev: () => set((state) => ({ isOnDev: !state.isOnDev })),

      setAnsweredQuestionsIds: (answeredQuestions) =>
        set({ answeredQuestionsIds: answeredQuestions }),

      setCurrentQuestion: (question) => set({ currentQuestion: question }),

      setPlayers: (players) => set({ players: players }),

      setActivePlayerId: (id) => set({ activePlayerId: id }),

      setPrevActivePlayerId: (id) => set({ prevActivePlayerId: id }),

      setStatus: (status) => set({ status: status }),

      setMaterial: (material) => set({ material: material }),

      setUsedThemesIds: (newThemes) => set({ usedThemesIds: newThemes }),

      setUsedQuestionsIds: (newQuestions) =>
        set({ usedQuestionsIds: newQuestions }),
    }),
    {
      name: "game-storage",
    },
  ),
);
