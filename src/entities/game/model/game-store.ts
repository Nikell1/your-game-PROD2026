import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  devModeInitialState,
  devModeSlice,
  DevModeSlice,
  gamePlayersInitialState,
  gamePlayersRoundInitialState,
  gamePlayersSlice,
  GamePlayersSlice,
  gameStatusInitialState,
  gameStatusSlice,
  GameStatusSlice,
  questionInitialState,
  questionSlice,
  QuestionSlice,
  timerInitialState,
  timerSlice,
  TimerSlice,
  usedIdsInitialState,
  usedIdsSlice,
  UsedIdsSlice,
} from "./slices";

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

const fullInitialState = {
  ...devModeInitialState,
  ...gamePlayersInitialState,
  ...questionInitialState,
  ...gameStatusInitialState,
  ...timerInitialState,
  ...usedIdsInitialState,
};

const roundInitialState = {
  ...timerInitialState,
  ...questionInitialState,
  ...gamePlayersRoundInitialState,
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
