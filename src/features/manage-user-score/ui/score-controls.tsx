"use client";

import { IActivePlayer } from "@/entities/player";
import { Button } from "@/shared/ui";
import { useManageScore } from "../lib/use-manage-score";
import { DEV_MODE_SCORE_BUTTON_POINT } from "../score-constants";
import { useGameStore } from "@/entities/game";

interface ScoreControlsProps {
  player: IActivePlayer;
}

export function ScoreControls({ player }: ScoreControlsProps) {
  const { increaseScore, decreaseScore } = useManageScore();
  const { isOnDev } = useGameStore();

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
            className="text-3xl absolute left-0 -top-0.5"
          >
            -
          </Button>

          <p className="text-xl w-full text-center py-1">{player.score}</p>

          <Button
            onClick={() =>
              increaseScore(player.id, DEV_MODE_SCORE_BUTTON_POINT)
            }
            variant="ghost"
            className="text-3xl absolute right-0 -top-0.5"
          >
            +
          </Button>
        </>
      ) : (
        <p className="text-xl w-full text-center py-1">{player.score}</p>
      )}
    </div>
  );
}
