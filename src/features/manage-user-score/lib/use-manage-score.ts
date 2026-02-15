import { useGameStore } from "@/entities/game";
import { MAX_SCORE, MIN_SCORE } from "../score.constants";

export function useManageScore() {
  const { players, setPlayers } = useGameStore();

  function increaseScore(playerId: number, points: number) {
    const newPlayers = players.map((p) =>
      p.id === playerId
        ? { ...p, score: Math.min(p.score + points, MAX_SCORE) }
        : p,
    );

    setPlayers(newPlayers);
  }

  function decreaseScore(playerId: number, points: number) {
    const newPlayers = players.map((p) =>
      p.id === playerId
        ? { ...p, score: Math.max(p.score - points, MIN_SCORE) }
        : p,
    );

    setPlayers(newPlayers);
  }

  return { increaseScore, decreaseScore };
}
