import { useGameStore } from "@/entities/game";
import { createEnterListener } from "@/shared/lib";
import { useModalStore } from "@/shared/model";
import { Button, Frame, Input } from "@/shared/ui";
import { useCallback, useEffect, useState } from "react";

export function FinalBetModal() {
  const { players, finalBets, pushFinalBets } = useGameStore();
  const { setModalState } = useModalStore();
  const [value, setValue] = useState("");

  const currentPlayer = players.filter(
    (player) => !finalBets.some((bet) => bet.playerId === player.id),
  )[0];

  const handleSubmit = useCallback(() => {
    pushFinalBets({ playerId: currentPlayer.id, bet: Number(value) });
    setModalState("closed");
  }, [currentPlayer, pushFinalBets, setModalState, value]);

  useEffect(() => {
    if (value) {
      const cleanup = createEnterListener(() => handleSubmit());
      return cleanup;
    }
  }, [value, handleSubmit]);

  return (
    <>
      <Frame className="rounded-lg p-4 text-2xl">
        Ваш счёт: {currentPlayer.score}
      </Frame>
      <Frame className="flex-col gap-4 p-4 rounded-lg items-center">
        <span className="text-xl">Ваша ставка</span>
        <Input
          isNumber
          className="w-50 text-center border-primary/50 text-2xl! outline-none"
          placeholder="1000"
          value={value}
          min={1}
          max={currentPlayer.score}
          onChange={(e) => setValue(e.target.value)}
        />
      </Frame>

      <Button
        onClick={handleSubmit}
        disabled={!value}
        size="xl"
        className="text-xl"
      >
        Подтвердить
      </Button>
    </>
  );
}
