import { cn } from "@/shared/lib";
import { IActivePlayer } from "../player-types";
import { PlayerCardWrapper } from "./player-card-wrapper";

interface PlayerActiveCardProps {
  player: IActivePlayer;
  children?: React.ReactNode;
  isActive: boolean;
  isBottom?: boolean;
}

export function PlayerActiveCard({
  player,
  children,
  isActive,
  isBottom = true,
}: PlayerActiveCardProps) {
  return (
    <PlayerCardWrapper
      player={player}
      style={isActive ? { boxShadow: `0 0 10px 0 ${player.color}40` } : {}}
      className={cn(
        " transition-all duration-300",
        isBottom && "border-b-0! rounded-b-none",
        isActive && "scale-115 -translate-y-6 shadow-md",
      )}
    >
      <p className="text-2xl font-medium" style={{ color: player.color }}>
        {player.name}
      </p>

      <p className="text-2xl">{player.key.label}</p>

      {children}
    </PlayerCardWrapper>
  );
}
