import { useGameStore } from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { useNewRound } from "@/features/new-round";
import { GAME_ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib";
import { useModalStore } from "@/shared/model";
import { Button, Frame } from "@/shared/ui";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";

export function RoundResultsModal() {
  const { players, status, setStatus } = useGameStore();
  const { say } = useHostPhrases();
  const { setModalState } = useModalStore();

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => b.score - a.score);
  }, [players]);

  const canFinal = players.filter((p) => p.score > 0).length > 1;

  useEffect(() => {
    say({ eventType: "general_round_end" });
  }, [say]);

  const newRound = useNewRound();
  return (
    <>
      <div className="flex flex-col gap-6 items-center w-full">
        <h1 className="text-5xl font-bold">Раунд закончен!</h1>

        <p className="text-3xl">Подводим итоги</p>

        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className={cn(
              "flex w-full justify-between gap-8",
              status === "ROUND_2" && player.score <= 0 && "opacity-30",
            )}
          >
            <div className="flex gap-4">
              <span className="text-2xl flex m-auto">{index + 1}.</span>

              <Frame className="w-80 py-2 px-4 rounded-xl text-xl">
                {player.name}
              </Frame>
            </div>
            <Frame className="rounded-xl text-xl items-center py-2 px-4 w-40">
              Cчёт: {player.score}
            </Frame>
          </div>
        ))}
        {canFinal || status !== "ROUND_2" ? (
          <Button
            variant="ghost"
            onClick={() => newRound({})}
            className="flex gap-1 group mt-4"
          >
            <span className="text-2xl">
              К {status === "ROUND_2" ? "финальному" : "следующему"} раунду
            </span>
            <ChevronRight className="relative size-7 top-1 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-foreground/40">
              Слишком мало игроков, прошедших в финал
            </p>
            <Link
              href={GAME_ROUTES.ENDING}
              className="text-2xl flex group"
              onClick={() => {
                setModalState("closed");
                setStatus("ENDING");
              }}
            >
              <span>К завершению</span>
              <ChevronRight className="relative size-7 top-1 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
