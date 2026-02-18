import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAuctionPlayer } from "../auction-types";

interface AuctionState {
  players: IAuctionPlayer[];
  minBet: number;
  currentWinnerId: number;
  currentWinnerBet: number;
}

interface AuctionActions {
  setPlayers: (players: IAuctionPlayer[]) => void;
  setMinBet: (bet: number) => void;
  setCurrentWinnerId: (id: number) => void;
  setCurrentWinnerBet: (bet: number) => void;
  setPlayerBet: (id: number, bet: number) => void;
  setPlayerIsPassed: (id: number, isPassed: boolean) => void;
}

interface AuctionStoreState extends AuctionState, AuctionActions {}

const initialState: AuctionState = {
  players: [],
  minBet: 0,
  currentWinnerBet: 0,
  currentWinnerId: -1,
};

export const useAuctionStore = create<AuctionStoreState>()(
  persist(
    (set) => ({
      ...initialState,

      setCurrentWinnerBet: (bet) => set({ currentWinnerBet: bet }),

      setCurrentWinnerId: (id) => set({ currentWinnerId: id }),

      setMinBet: (bet) => set({ minBet: bet }),

      setPlayers: (players) => set({ players: players }),

      setPlayerBet: (id, bet) => {
        set((state) => ({
          players: state.players.map((player) =>
            player.id === id ? { ...player, bet } : { ...player },
          ),
        }));
      },

      setPlayerIsPassed: (id, isPassed) =>
        set((state) => ({
          players: state.players.map((player) =>
            player.id === id ? { ...player, isPassed } : { ...player },
          ),
        })),
    }),
    { name: "auction-storage" },
  ),
);
