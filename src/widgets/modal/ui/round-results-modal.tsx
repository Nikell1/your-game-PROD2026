import { useGameStore } from "@/entities/game";
import { useNewRound } from "@/features/new-round";
import { Button, Frame } from "@/shared/ui";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";

export function RoundResultsModal() {
  const { players } = useGameStore();

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => b.score - a.score);
  }, [players]);

  const newRound = useNewRound();
  return (
    <>
      <div className="flex flex-col gap-6 items-center w-full">
        <h1 className="text-5xl font-bold">Раунд закончен!</h1>

        <p className="text-3xl">Подводим итоги</p>

        {sortedPlayers.map((player, index) => (
          <div key={player.id} className="flex w-full justify-between gap-8">
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

        <Button
          variant="ghost"
          onClick={() => newRound({})}
          className="flex gap-1 group mt-4"
        >
          <span className="text-2xl">К следующему раунду</span>
          <ChevronRight className="relative size-7 top-1 group-hover:translate-x-2 transition-transform duration-300" />
        </Button>
      </div>
    </>
  );
}
