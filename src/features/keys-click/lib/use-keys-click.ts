import { useGameStore } from "@/entities/game";
import { useAnswerInputStore } from "@/features/answer-question";
import { useMemo } from "react";

interface PlayersKey {
  code: string;
  playerId: number;
}

export function useKeysClick() {
  const { players, setActivePlayerId } = useGameStore();
  const { setInputValue, setIsCorrect } = useAnswerInputStore();

  const playersKeys = useMemo<PlayersKey[]>(() => {
    return players.map((player) => ({
      code: player.key.code,
      playerId: player.id,
    }));
  }, [players]);

  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();

    const currentPlayerId = playersKeys.find(
      (key) => key.code === event.code,
    )?.playerId;

    if (currentPlayerId) {
      setActivePlayerId(currentPlayerId);
      setInputValue("");
      setIsCorrect(null);
    }
  };

  return { handleKeyDown };
}
