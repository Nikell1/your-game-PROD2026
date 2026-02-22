import { useGameStore } from "@/entities/game";

export function useEndGame() {
  const { resetStore } = useGameStore();
  return () => {
    resetStore();
  };
}
