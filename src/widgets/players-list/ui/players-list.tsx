"use client";

import { useGameStore } from "@/entities/game";
import { PlayerActiveCard, TSizes } from "@/entities/player";
import { useAnswerInputStore } from "@/features/answer-question";
import { ScoreControls } from "@/features/manage-user-score";
import { cn } from "@/shared/lib";

export function PlayersList() {
  const { players, activePlayerId, status, finalBets } = useGameStore();
  const { disabledPlayerIds } = useAnswerInputStore();
  const size: TSizes = players.length > 5 ? "sm" : "lg";

  const chosenPlayers =
    status === "FINAL_ROUND"
      ? players.filter((player) =>
          finalBets.some((bet) => bet.playerId === player.id),
        )
      : players;

  return (
    <div
      className={cn("w-full absolute bottom-0", players.length > 4 && "z-3")}
    >
      <div
        className="w-full h-30 absolute bottom-0 bg-accent/50 backdrop-blur-xs 
      border border-primary border-b-0 rounded-t-[80px]"
      />

      <div className="flex flex-row-reverse gap-[3%] px-20 overflow-hidden pt-12">
        {chosenPlayers.map((player) => (
          <PlayerActiveCard
            size={size}
            key={player.id}
            player={player}
            isActive={player.id === activePlayerId}
            isDisabled={disabledPlayerIds.includes(player.id)}
          >
            <ScoreControls player={player} size={size} />
          </PlayerActiveCard>
        ))}
      </div>
    </div>
  );
}
