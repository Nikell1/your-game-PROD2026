import { useGameStore } from "@/entities/game";
import { PlayerActiveCard } from "@/entities/player";
import { ScoreControls } from "@/features/manage-user-score";
import { GAME_ROUTES } from "@/shared/config";
import { COLOR_PRIMARY } from "@/shared/constants";
import { useModalStore } from "@/shared/model";
import { Button, Frame } from "@/shared/ui";
import Link from "next/link";
import { useEffect } from "react";

export function FinalTable() {
  const {
    finalQuestion,
    players,
    finalBets,
    activePlayerId,
    setActivePlayerId,
  } = useGameStore();
  const { setModalState } = useModalStore();
  const playersWithoutBet = players.filter(
    (player) => !finalBets.some((bet) => bet.playerId === player.id),
  );

  const buttonColor = playersWithoutBet[0]?.color || COLOR_PRIMARY;

  useEffect(() => {
    if (!playersWithoutBet[0] && !activePlayerId && players[0]) {
      setActivePlayerId(players[0].id);
    }
  }, [players, activePlayerId, playersWithoutBet, setActivePlayerId]);

  const answeringPlayer = players.find((p) => p.id === activePlayerId);

  return (
    <Frame className="rounded-xl p-4 flex-col gap-8 w-240 max-h-120">
      <Frame className="p-2 rounded-lg text-2xl justify-center">
        Тема финала: {finalQuestion.themeLabel}
      </Frame>
      {playersWithoutBet[0] ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-6">
            {playersWithoutBet.map((player) => (
              <PlayerActiveCard
                isBottom={false}
                key={player.id}
                player={player}
                isActive={false}
              >
                <ScoreControls player={player} />
              </PlayerActiveCard>
            ))}
          </div>
          <Frame color={buttonColor} className="w-50 rounded-lg">
            <Button
              className="w-full hover:bg-foreground/5"
              variant="ghost"
              onClick={() => setModalState("final_bet")}
            >
              Сделать ставку
            </Button>
          </Frame>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-12">
          <Frame className="flex-col gap-4 items-center w-120 rounded-xl p-6">
            <h2 className="text-3xl font-bold">
              Очередь игрока {answeringPlayer?.name}
            </h2>
            <p className="text-xl">Не подглядывайте за отвечающим!</p>
          </Frame>

          <Button asChild size="xl" className="text-2xl">
            <Link href={GAME_ROUTES.QUESTION(finalQuestion.id)}>Готов</Link>
          </Button>
        </div>
      )}
    </Frame>
  );
}
