import { useGameStore } from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { PlayerActiveCard } from "@/entities/player";
import { ScoreControls } from "@/features/manage-user-score";
import { GAME_ROUTES } from "@/shared/config";
import { COLOR_DESTRUCTIVE, COLOR_SUCCESS } from "@/shared/constants";
import { Button, Frame } from "@/shared/ui";
import Link from "next/link";
import { useEffect } from "react";

export function EndingTable() {
  const { players, answeredPlayers, finalBets, finalQuestion } = useGameStore();
  const { say } = useHostPhrases();

  useEffect(() => {
    say({ eventType: "final_results" });
  }, [say]);

  return (
    <Frame className="rounded-xl py-4 px-8 flex-col gap-6 w-240 max-h-160">
      <Frame className="p-2 rounded-lg text-2xl justify-center">
        Подводим итоги
      </Frame>
      <div className="flex flex-wrap overflow-auto custom-scroll gap-6">
        {players.map((player) => {
          const playerBet = finalBets.find((fb) => fb.playerId === player.id);
          const answer = answeredPlayers.find((ans) => ans.id === player.id);
          const isCorAns = answer?.isCorrect ? "Верный" : "Неверный";
          const color = answer?.isCorrect ? COLOR_SUCCESS : COLOR_DESTRUCTIVE;

          return (
            <div key={player.id} className="flex gap-4 flex-col pt-2">
              <PlayerActiveCard
                player={player}
                isActive={false}
                isBottom={false}
              >
                <ScoreControls player={player} size="lg" />
              </PlayerActiveCard>

              <Frame
                color={color}
                className="flex flex-col text-xl gap-1 p-2 rounded-lg"
              >
                <span>Ставка: {playerBet?.bet}</span>
                <p>
                  Ответ <span className={color}>{isCorAns}</span>
                </p>
              </Frame>
            </div>
          );
        })}
      </div>

      <Frame className="rounded-lg p-4">
        Правильный ответ: {finalQuestion.correctAnswer}
      </Frame>
      <Button size="xl" className="text-xl" asChild>
        <Link href={GAME_ROUTES.ENDING}>К завершению</Link>
      </Button>
    </Frame>
  );
}
