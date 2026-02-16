import React, { CSSProperties } from "react";
import { ISetupPlayer } from "../player-types";
import { cn } from "@/shared/lib";
import { Frame } from "@/shared/ui";

interface PlayerCardProps {
  player: ISetupPlayer;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function PlayerCardWrapper({
  player,
  children,
  className,
  style = {},
}: PlayerCardProps) {
  return (
    <Frame
      style={style}
      color={player.color}
      className={cn(
        " w-50 h-66 gap-2 items-center justify-between rounded-lg",
        className,
      )}
    >
      <div
        className="rounded-full size-20 bg-white/70 border"
        style={{ borderColor: player.color }}
      ></div>

      {children}
    </Frame>
  );
}
