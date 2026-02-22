import { Button, Input } from "@/shared/ui";
import { PlayerCardWrapper } from "./player-card-wrapper";
import { Trash2 } from "lucide-react";
import { ISetupPlayer } from "../player-types";
import { MAX_NAME_LENGTH } from "../player-constants";

interface PlayerSetupCardProps {
  player: ISetupPlayer;
  isDisabled: boolean;
  index: number;

  onPlayerRemove: (index: number) => void;
  onNameChange: (index: number, name: string) => void;
  onClick: () => void;
}

export function PlayerSetupCard({
  player,
  isDisabled,
  onPlayerRemove,
  index,
  onNameChange,
  onClick,
}: PlayerSetupCardProps) {
  return (
    <PlayerCardWrapper player={player} isSetup onClick={onClick}>
      <Button
        variant="ghost"
        disabled={isDisabled}
        className="absolute right-1 top-3"
        onClick={() => onPlayerRemove(index)}
      >
        <Trash2 style={{ color: player.color }} className="size-6" />
      </Button>

      <Input
        onChange={(e) => onNameChange(index, e.target.value)}
        value={player.name}
        placeholder="Имя игрока"
        className="border text-center text-xl!"
        maxLength={MAX_NAME_LENGTH}
        style={{
          color: player.color,
          borderColor: player.color,
        }}
      />

      <p className="text-2xl">{player.key.label}</p>

      <Button
        variant="ghost"
        className=" text-sm"
        style={{ color: player.color }}
      >
        Редактировать профиль
      </Button>
    </PlayerCardWrapper>
  );
}
