"use client";

import { useGameStore, getRoundTitle } from "@/entities/game";
import { useAnswerTimeout } from "@/features/answer-question";
import { useKeysClick } from "@/features/keys-click";
import {
  CurrentQuestionWidget,
  Header,
  HostWidget,
  PlayersList,
} from "@/widgets";
import { useTimer } from "@siberiacancode/reactuse";
import { useEffect } from "react";

export function QuestionPage() {
  const {
    status,
    activePlayerId,
    isTimerActive,
    timerSeconds,
    setTimerSeconds,
  } = useGameStore();

  const questionTimeOut = useAnswerTimeout();

  const timer = useTimer(timerSeconds, {
    immediately: isTimerActive,
  });

  const { handleKeyDown } = useKeysClick(timer.pause);

  useEffect(() => {
    if (timer.seconds === 0 && isTimerActive) {
      questionTimeOut();
    }
  }, [timer.seconds, isTimerActive, questionTimeOut]);

  useEffect(() => {
    if (timerSeconds !== timer.seconds && isTimerActive) {
      setTimerSeconds(timer.seconds);
    }
  }, [timer.seconds]);

  useEffect(() => {
    if (!activePlayerId) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [activePlayerId, handleKeyDown]);

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
