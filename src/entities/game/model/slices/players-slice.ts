import {
  IActivePlayer,
  IFinalAnsweredPlayer,
  IFinalBet,
} from "@/entities/player";
import { produce } from "immer";
import { StateCreator } from "zustand";

export interface GamePlayersSlice {
  players: IActivePlayer[];
  activePlayerId: number | null;
  prevActivePlayerId: number | null;
  finalBets: IFinalBet[];
  answeredPlayers: IFinalAnsweredPlayer[];

  pushFinalBets: (finalBet: IFinalBet) => void;
  setPlayers: (players: IActivePlayer[]) => void;
  setActivePlayerId: (id: number | null) => void;
  setPrevActivePlayerId: (id: number | null) => void;
  getPlayerWithMinScore: () => IActivePlayer | undefined;
  setFinalAnswers: (correct: boolean, answer: string) => void;
  resetAnsweredPlayers: () => void;
}

export const gamePlayersInitialState = {
  players: [],
  activePlayerId: null,
  prevActivePlayerId: null,
  finalBets: [],
  answeredPlayers: [],
};

export const gamePlayersRoundInitialState = {
  prevActivePlayerId: null,
  finalBets: [],
  answeredPlayers: [],
};

export const gamePlayersSlice: StateCreator<GamePlayersSlice> = (set, get) => ({
  ...gamePlayersInitialState,

  resetAnsweredPlayers: () => set({ answeredPlayers: [] }),

  pushFinalBets: (finalBet) =>
    set((state) => ({
      finalBets: [...state.finalBets, finalBet],
    })),

  getPlayerWithMinScore: () => {
    const { players } = get();
    if (players.length === 0) return undefined;

    return players.reduce((min, player) =>
      player.score < min.score ? player : min,
    );
  },

  setPlayers: (players) => set({ players: players }),

  setActivePlayerId: (id) => set({ activePlayerId: id }),

  setPrevActivePlayerId: (id) => set({ prevActivePlayerId: id }),

  setFinalAnswers: (correct, answer) =>
    set(
      produce((state: GamePlayersSlice) => {
        if (state.activePlayerId === null) {
          return;
        }

        const currentPlayerId = state.activePlayerId;

        state.answeredPlayers.push({
          id: currentPlayerId,
          isCorrect: correct,
          answer: answer,
        });

        const nextPlayer = state.players.find(
          (player) =>
            !state.answeredPlayers.some(
              (answered) => answered.id === player.id,
            ),
        );

        state.activePlayerId = nextPlayer?.id ?? null;
      }),
      false,
    ),
});
