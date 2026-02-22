import { useGameStore } from "@/entities/game";
import { useAnswerTimeout } from "@/features/answer-question";
import { useFinalQuestionTimeout } from "@/features/final-question";
import { useTimer } from "@siberiacancode/reactuse";
import { useEffect } from "react";

export function useCustomTimer() {
  const {
    timerSeconds,
    isTimerActive,
    setIsTimerActive,
    setTimerSeconds,
    status,
    setIsShowTimer,
    isShowTimer,
  } = useGameStore();
  const timer = useTimer(timerSeconds, {
    immediately: isTimerActive,
  });

  const questionTimeOut = useAnswerTimeout(timer.clear);
  const finalTimeout = useFinalQuestionTimeout(timer.clear);

  const timeoutHandler =
    status === "FINAL_ROUND" ? finalTimeout : questionTimeOut;

  useEffect(() => {
    if (timer.seconds === 0 && isTimerActive && isShowTimer) {
      timeoutHandler();
    }
  }, [timer.seconds]);

  useEffect(() => {
    if (timerSeconds !== timer.seconds && isTimerActive && isShowTimer) {
      setTimerSeconds(timer.seconds);
    }
  }, [timer.seconds]);

  function clear() {
    timer.clear();
    setIsTimerActive(false);
    setIsShowTimer(false);
  }

  function pause() {
    timer.pause();
    setIsShowTimer(true);
  }

  function resume() {
    timer.resume();
    setIsTimerActive(true);
    setIsShowTimer(true);
  }

  function start(seconds: number) {
    setIsTimerActive(true);
    setTimerSeconds(seconds);
    setIsShowTimer(true);
  }

  return { clear, pause, resume, seconds: timer.seconds, start };
}
