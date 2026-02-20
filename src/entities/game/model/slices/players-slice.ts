import { IActivePlayer, IFinalBet } from "@/entities/player";
import { StateCreator } from "zustand";

export interface GamePlayersSlice {
  players: IActivePlayer[];
  activePlayerId: number | null;
  prevActivePlayerId: number | null;
  finalBets: IFinalBet[];
  answeredPlayersIds: number[];

  pushAnsweredPlayersIds: (id: number) => void;
  pushFinalBets: (finalBet: IFinalBet) => void;
  setPlayers: (players: IActivePlayer[]) => void;
  setActivePlayerId: (id: number | null) => void;
  setPrevActivePlayerId: (id: number | null) => void;
  getPlayerWithMinScore: () => IActivePlayer | undefined;
}

export const gamePlayersSlice: StateCreator<GamePlayersSlice> = (set, get) => ({
  players: [],
  activePlayerId: null,
  prevActivePlayerId: null,
  finalBets: [],
  answeredPlayersIds: [],

  pushFinalBets: (finalBet) =>
    set((state) => ({
      finalBets: [...state.finalBets, finalBet],
    })),

  pushAnsweredPlayersIds: (id) =>
    set((state) => ({
      answeredPlayersIds: [...state.answeredPlayersIds, id],
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
});
