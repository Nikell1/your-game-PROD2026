import { IActivePlayer } from "@/entities/player";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  IGameQuestion,
  IThemeWithQuestions,
  TGameStatus,
} from "../game-types";

interface GameStoreState {
  status: TGameStatus;
  players: IActivePlayer[];
  activePlayerId: number | null;
  currentQuestion: IGameQuestion | null;
  isOnDev: boolean;
  answeredQuestionsIds: string[];
  material: IThemeWithQuestions[];
  usedThemesIds: string[];
  usedQuestionsIds: string[];
}

interface GameStoreActions {
  setPlayers: (players: IActivePlayer[]) => void;
  setStatus: (status: TGameStatus) => void;
  setActivePlayerId: (id: number | null) => void;
  setCurrentQuestion: (question: IGameQuestion | null) => void;
  setIsOnDev: () => void;
  setAnsweredQuestionsIds: (answeredQuesitons: string[]) => void;
  setMaterial: (material: IThemeWithQuestions[]) => void;
  setUsedThemesIds: (newThemes: string[]) => void;
  setUsedQuestionsIds: (newQuestions: string[]) => void;
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
};

interface IGameStore extends GameStoreState, GameStoreActions {}

export const useGameStore = create<IGameStore>()(
  persist(
    (set) => ({
      ...initialState,

      setIsOnDev: () => set((state) => ({ isOnDev: !state.isOnDev })),

      setAnsweredQuestionsIds: (answeredQuestions) =>
        set({ answeredQuestionsIds: answeredQuestions }),

      setCurrentQuestion: (question) => set({ currentQuestion: question }),

      setPlayers: (players) => set({ players: players }),

      setActivePlayerId: (id) => set({ activePlayerId: id }),

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
