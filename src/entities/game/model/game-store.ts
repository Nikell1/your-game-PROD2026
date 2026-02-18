import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  devModeSlice,
  DevModeSlice,
  gamePlayersSlice,
  GamePlayersSlice,
  gameStatusSlice,
  GameStatusSlice,
  questionSlice,
  QuestionSlice,
  timerSlice,
  TimerSlice,
  usedIdsSlice,
  UsedIdsSlice,
} from "./slices";
import { DEFAULT_TIMER_SECONDS } from "../game-constants";
import { TGameStatus, TQuestionSpecials } from "../game-types";

interface IGameStore
  extends
    DevModeSlice,
    GamePlayersSlice,
    QuestionSlice,
    GameStatusSlice,
    TimerSlice,
    UsedIdsSlice {
  resetStore: () => void;
  resetRound: () => void;
}

const roundInitialState = {
  timerSeconds: DEFAULT_TIMER_SECONDS,
  isTimerActive: false,
  currentQuestion: null,
  answeredQuestionsIds: [],
  material: [],
  specials: "default" as TQuestionSpecials,
  prevActivePlayerId: null,
};

const fullInitialState = {
  status: "NOT_STARTED" as TGameStatus,
  players: [],
  activePlayerId: null,
  isOnDev: false,
  usedThemesIds: [],
  usedQuestionsIds: [],
  ...roundInitialState,
};

export const useGameStore = create<IGameStore>()(
  persist(
    (set, get, store) => ({
      ...devModeSlice(set, get, store),
      ...gamePlayersSlice(set, get, store),
      ...questionSlice(set, get, store),
      ...gameStatusSlice(set, get, store),
      ...timerSlice(set, get, store),
      ...usedIdsSlice(set, get, store),

      resetStore: () => {
        set(fullInitialState);
      },

      resetRound: () => {
        const state = get();
        const playerWithMinScore = state.getPlayerWithMinScore();

        set({
          ...roundInitialState,
          players: state.players,
          isOnDev: state.isOnDev,
          activePlayerId: playerWithMinScore?.id || null,
          usedQuestionsIds: state.usedQuestionsIds,
          usedThemesIds: state.usedThemesIds,
        });
      },
    }),
    {
      name: "game-storage",
    },
  ),
);
