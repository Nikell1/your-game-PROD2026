import {
  IKey,
  ISetupPlayer,
  MIN_PLAYERS,
  PLAYERS_KEYS_LIST,
} from "@/entities/player";
import { DEFAULT_COLORS_LIST } from "@/shared/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SetupGameStoreState {
  playersData: ISetupPlayer[];
  players: number;
}

interface SetupGameStoreActions {
  addPlayer: () => void;
  resetSetupGameStore: () => void;
  removePlayer: (index: number) => void;
  updatePlayerName: (index: number, name: string) => void;
}

interface ISetupGameStore extends SetupGameStoreState, SetupGameStoreActions {}

const initialState: SetupGameStoreState = {
  players: MIN_PLAYERS,
  playersData: [
    {
      name: "",
      color: DEFAULT_COLORS_LIST[0],
      key: PLAYERS_KEYS_LIST[0],
    },
    {
      name: "",
      color: DEFAULT_COLORS_LIST[1],
      key: PLAYERS_KEYS_LIST[1],
    },
    {
      name: "",
      color: DEFAULT_COLORS_LIST[2],
      key: PLAYERS_KEYS_LIST[2],
    },
  ],
};

export const useSetupGameStore = create<ISetupGameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addPlayer: () => {
        const { playersData } = get();

        const usedColors = playersData.map((p) => p.color);
        const usedKeys = playersData.map((p) => p.key.label);

        const availableColor = DEFAULT_COLORS_LIST.find(
          (color) => !usedColors.includes(color),
        );

        const availableKeys = PLAYERS_KEYS_LIST.filter(
          (key) => !usedKeys.includes(key.label),
        );

        const newColor = availableColor || DEFAULT_COLORS_LIST[0];
        const newKey: IKey = availableKeys[0] || "no key";

        set((state) => ({
          players: state.players + 1,
          playersData: [
            ...state.playersData,
            {
              name: "",
              key: newKey,
              color: newColor,
            },
          ],
        }));
      },

      removePlayer: (index) =>
        set((state) => ({
          players: state.players - 1,
          playersData: state.playersData.filter((_, i) => i !== index),
        })),

      updatePlayerName: (index, name) =>
        set((state) => ({
          playersData: state.playersData.map((player, i) =>
            i === index ? { ...player, name } : player,
          ),
        })),

      resetSetupGameStore: () => set({ ...initialState }),
    }),
    { name: "setup-game-storage" },
  ),
);
