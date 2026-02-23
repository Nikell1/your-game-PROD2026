"use client";

import { IActivePlayer, TSizes } from "@/entities/player";
import { Button } from "@/shared/ui";
import { useManageScore } from "../lib/use-manage-score";
import { DEV_MODE_SCORE_BUTTON_POINT } from "../score-constants";
import { useGameStore } from "@/entities/game";
import { cn } from "@/shared/lib";

interface ScoreControlsProps {
  player: IActivePlayer;
  size: TSizes;
}

export function ScoreControls({ player, size }: ScoreControlsProps) {
  const { increaseScore, decreaseScore } = useManageScore();
  const { isOnDev } = useGameStore();

  const sizes = {
    controls: {
      lg: "text-3xl",
      sm: "text-lg",
    },
    text: {
      lg: "text-xl",
      sm: "lext-md",
    },
  };

  return (
    <div
      className="flex relative gap-4 bg-background/10 border rounded-lg items-center justify-between my-1 w-full py-0.5"
      style={{ borderColor: player.color }}
    >
      {isOnDev ? (
        <>
          <Button
            onClick={() =>
              decreaseScore(player.id, DEV_MODE_SCORE_BUTTON_POINT)
            }
            variant="ghost"
            className={cn(sizes.controls[size], "absolute left-0 -top-0.5")}
          >
            -
          </Button>

          <p className={cn(sizes.text[size], "w-full text-center py-1")}>
            {player.score}
          </p>

          <Button
            onClick={() =>
              increaseScore(player.id, DEV_MODE_SCORE_BUTTON_POINT)
            }
            variant="ghost"
            className={cn(sizes.controls[size], "absolute right-0 -top-0.5")}
          >
            +
          </Button>
        </>
      ) : (
        <p className={cn(sizes.text[size], "w-full text-center py-1")}>
          {player.score}
        </p>
      )}
    </div>
  );
}
