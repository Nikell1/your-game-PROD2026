import React, { CSSProperties } from "react";
import { ISetupPlayer } from "../player-types";
import { cn } from "@/shared/lib";
import { Button, Frame } from "@/shared/ui";
import { COLOR_PRIMARY } from "@/shared/constants";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { PRESET_AVATARS } from "../player-constants";

interface PlayerCardProps {
  player: ISetupPlayer;
  children: React.ReactNode;
  className?: string;
  isSetup?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}

export function PlayerCardWrapper({
  player,
  children,
  isSetup = false,
  className,
  onClick = () => {},
  style = {},
}: PlayerCardProps) {
  return (
    <Frame
      style={style}
      color={player?.color || COLOR_PRIMARY}
      className={cn(
        " w-50 h-66 gap-2 items-center justify-between rounded-lg flex-col p-4",
        className,
      )}
    >
      <div
        className="rounded-full size-20 bg-background/50 border relative"
        style={{ borderColor: player?.color || COLOR_PRIMARY }}
      >
        <Image
          src={player.avatar || PRESET_AVATARS[0]}
          alt="Аватар"
          fill
          className={cn(
            "rounded-full object-cover",
            isSetup && "brightness-50",
          )}
        />
        {isSetup && (
          <Button
            onClick={onClick}
            variant="ghost"
            className="absolute top-[50%] left-[50%] -translate-[50%] cursor-pointer"
          >
            <Pencil color={player.color} className="size-6" />
          </Button>
        )}
      </div>

      {children}
    </Frame>
  );
}
