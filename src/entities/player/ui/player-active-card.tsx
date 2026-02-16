import { cn } from "@/shared/lib";
import { IActivePlayer } from "../player.types";
import { PlayerCardWrapper } from "./player-card-wrapper";

interface PlayerActiveCardProps {
  player: IActivePlayer;
  children: React.ReactNode;
  isActive: boolean;
}

export function PlayerActiveCard({
  player,
  children,
  isActive,
}: PlayerActiveCardProps) {
  return (
    <PlayerCardWrapper
      player={player}
      style={isActive ? { boxShadow: `0 0 10px 0 ${player.color}40` } : {}}
      className={cn(
        "border-b-0! rounded-b-none transition-all duration-300",
        isActive && "scale-115 -translate-y-6 shadow-md",
      )}
    >
      <p className="text-2xl font-medium" style={{ color: player.color }}>
        {player.name}
      </p>

      <p className="text-3xl">{player.key.label}</p>

      {children}
    </PlayerCardWrapper>
  );
}
