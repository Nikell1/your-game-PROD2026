import { cn } from "@/shared/lib";
import { IActivePlayer, TSizes } from "../player-types";
import { PlayerCardWrapper } from "./player-card-wrapper";

interface PlayerActiveCardProps {
  player: IActivePlayer;
  children?: React.ReactNode;
  isActive: boolean;
  isBottom?: boolean;
  isDisabled?: boolean;
  size?: TSizes;
}

export function PlayerActiveCard({
  player,
  children,
  isActive,
  isBottom = true,
  isDisabled = false,
  size = "lg",
}: PlayerActiveCardProps) {
  const sizes = {
    text: {
      lg: "text-2xl",
      sm: "text-lg",
    },
  };

  return (
    <PlayerCardWrapper
      size={size}
      player={player}
      style={isActive ? { boxShadow: `0 0 10px 0 ${player.color}40` } : {}}
      className={cn(
        "hover:-translate-y-2 pb-5!",
        isBottom && "border-b-0! rounded-b-none relative top-2",
        isActive && "scale-115 -translate-y-5 shadow-md hover:-translate-y-7",
        isDisabled && "opacity-50 pointer-events-none brightness-70",
      )}
    >
      <p
        className={cn(sizes.text[size], "font-medium leading-6 text-center")}
        style={{ color: player.color }}
      >
        {player.name}
      </p>

      <p className={sizes.text[size]}>{player.key.label}</p>

      {children}
    </PlayerCardWrapper>
  );
}
