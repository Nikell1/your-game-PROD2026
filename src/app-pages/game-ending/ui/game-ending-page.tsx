"use client";

import { useGameStore } from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { PlayerWinnerCard } from "@/entities/player";
import { useEndGame } from "@/features/end-game";
import { Button } from "@/shared/ui";
import { Header, HostWidget } from "@/widgets";
import Link from "next/link";
import { useEffect, useMemo } from "react";

export function GameEndingPage() {
  const { players } = useGameStore();

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => b.score - a.score);
  }, [players]);

  const endGame = useEndGame();
  const { say } = useHostPhrases();

  useEffect(() => {
    say({ eventType: "game_results" });
  }, [say]);
  return (
    <>
      <Header title="Победители" />

      <div className="flex w-full p-8 flex-1">
        <HostWidget />
        <div className="flex-1 flex justify-center gap-12 items-end relative z-3">
          {sortedPlayers[2] && (
            <PlayerWinnerCard player={sortedPlayers[2]} place={3} />
          )}
          {sortedPlayers[0] && (
            <PlayerWinnerCard player={sortedPlayers[0]} place={1} />
          )}
          {sortedPlayers[1] && (
            <PlayerWinnerCard player={sortedPlayers[1]} place={2} />
          )}
        </div>
        <div
          className="w-full h-30 absolute bottom-0 bg-accent/50 left-0 backdrop-blur-xs 
          border border-primary border-b-0 rounded-t-[80px]"
        />
        <Button asChild size="xl">
          <Link
            className="absolute left-[50%] translate-[50%] z-10"
            href="/"
            onClick={endGame}
          >
            На главную
          </Link>
        </Button>
      </div>
    </>
  );
}
