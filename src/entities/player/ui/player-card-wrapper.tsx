import React, { CSSProperties } from "react";
import { ISetupPlayer, TSizes } from "../player-types";
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
  size?: TSizes;
}

export function PlayerCardWrapper({
  player,
  children,
  isSetup = false,
  className,
  onClick = () => {},
  style = {},
  size = "lg",
}: PlayerCardProps) {
  const sizes = {
    container: {
      lg: "w-50 h-66",
      sm: "w-35 h-51",
    },
    avatar: {
      lg: "size-20",
      sm: "size-12",
    },
  };

  return (
    <Frame
      style={style}
      color={player?.color || COLOR_PRIMARY}
      className={cn(
        sizes.container[size],
        "gap-2 items-center justify-between rounded-lg flex-col p-4 duration-200 transition-all",
        className,
      )}
    >
      <div
        className={cn(
          sizes.avatar[size],
          "rounded-full bg-background/50 border relative",
        )}
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
