"use client";

import { useGameStore, getRoundTitle } from "@/entities/game";
import { useKeysClick } from "@/features/keys-click";
import { useCustomTimer } from "@/features/timer";
import {
  CurrentQuestionWidget,
  Header,
  HostWidget,
  PlayersList,
} from "@/widgets";
import { useEffect } from "react";

export function QuestionPage() {
  const { status, activePlayerId } = useGameStore();
  const timer = useCustomTimer();

  const { handleKeyDown } = useKeysClick(timer.pause);

  useEffect(() => {
    if (!activePlayerId && status !== "FINAL_ROUND") {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activePlayerId, handleKeyDown, status]);

  const headerTitle = getRoundTitle(status);

  return (
    <>
      <Header title={headerTitle} />

      <div className="flex w-full p-8 flex-1">
        <HostWidget seconds={timer.seconds} />
        <div className="flex-1 flex justify-center">
          <CurrentQuestionWidget clear={timer.clear} resume={timer.resume} />
        </div>
      </div>

      <PlayersList />
    </>
  );
}
