"use client";

import { IActivePlayer } from "@/entities/player";
import { Button } from "@/shared/ui";
import { useManageScore } from "../lib/use-manage-score";
import { DEV_MODE_SCORE_BUTTON_POINT } from "../score.constants";

interface ScoreControlsProps {
  player: IActivePlayer;
}

export function ScoreControls({ player }: ScoreControlsProps) {
  const { increaseScore, decreaseScore } = useManageScore();

  return (
    <div
      className="flex gap-4 bg-background/10 border rounded-lg items-center justify-between my-2 w-full py-0.5"
      style={{ borderColor: player.color }}
    >
      <Button
        onClick={() => decreaseScore(player.id, DEV_MODE_SCORE_BUTTON_POINT)}
        variant="ghost"
        className="text-3xl relative -top-0.75"
      >
        -
      </Button>
      <p className="text-xl">{player.score}</p>
      <Button
        onClick={() => increaseScore(player.id, DEV_MODE_SCORE_BUTTON_POINT)}
        variant="ghost"
        className="text-3xl relative -top-0.75"
      >
        +
      </Button>
    </div>
  );
}
