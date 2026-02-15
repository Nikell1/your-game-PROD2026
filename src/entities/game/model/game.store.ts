import { IActivePlayer } from "@/entities/player";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TGameStatus, IGameQuestion, ITheme } from "../game.types";

interface GameStoreState {
  status: TGameStatus;
  players: IActivePlayer[];
  themes: ITheme[];
  questions: IGameQuestion[];
}

interface GameStoreActions {
  setPlayers: (players: IActivePlayer[]) => void;
  setStatus: (status: TGameStatus) => void;
  setThemes: (themes: ITheme[]) => void;
  setQuestions: (questions: IGameQuestion[]) => void;
}

const initialState: GameStoreState = {
  status: "NOT_STARTED",
  players: [],
  themes: [],
  questions: [],
};

interface IGameStore extends GameStoreState, GameStoreActions {}

const useGameStore = create<IGameStore>()(
  persist(
    (set) => ({
      ...initialState,

      setPlayers: (players) => set({ players: players }),

      setStatus: (status) => set({ status: status }),

      setThemes: (themes) => set({ themes: themes }),

      setQuestions: (questions) => set({ questions: questions }),
    }),
    {
      name: "game-storage",
    },
  ),
);

export default useGameStore;
