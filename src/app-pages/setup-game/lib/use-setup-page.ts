import { useEffect, useMemo, useState } from "react";
import { useSetupGameStore } from "../model/setup-game-store";
import { useNewRound } from "@/features/new-round";
import { MAX_PLAYERS, MIN_PLAYERS, validatePlayers } from "@/entities/player";
import { createEnterListener } from "@/shared/lib";

export function useSetupPage() {
  const { removePlayer, addPlayer, playersData, resetSetupGameStore, players } =
    useSetupGameStore();

  const startGame = useNewRound();

  const [newPlayerIndex, setNewPlayerIndex] = useState<number | null>(null);
  const [deletingPlayerIndex, setDeletingPlayerIndex] = useState<number | null>(
    null,
  );

  const isPlayersValid = useMemo(
    () => validatePlayers(playersData),
    [playersData],
  );

  const isRemoveBtnDisabled = useMemo(() => MIN_PLAYERS >= players, [players]);
  const isAddBtnDisabled = useMemo(() => MAX_PLAYERS > players, [players]);

  const handleRemovePlayer = (index: number) => {
    setDeletingPlayerIndex(index);
    setTimeout(() => {
      removePlayer(index);
      setDeletingPlayerIndex(null);
    }, 300);
  };

  const handleAddPlayer = () => {
    const newIndex = playersData.length;
    setNewPlayerIndex(newIndex);
    addPlayer();

    setTimeout(() => setNewPlayerIndex(null), 1000);
  };

  useEffect(() => {
    const cleanup = createEnterListener(() => {
      if (isPlayersValid) {
        startGame({ playersData, resetSetupGameStore });
      }
    });
    return cleanup;
  }, [isPlayersValid, playersData, resetSetupGameStore, startGame]);

  return {
    newPlayerIndex,
    deletingPlayerIndex,
    handleAddPlayer,
    handleRemovePlayer,
    isPlayersValid,
    startGame,
    isRemoveBtnDisabled,
    isAddBtnDisabled,
  };
}
