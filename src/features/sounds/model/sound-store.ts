import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SoundState {
  volume: number;
  setVolume: (volume: number) => void;
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      volume: 0,

      setVolume: (volume) => set({ volume: volume }),
    }),
    {
      name: "sound-storage",
    },
  ),
);
