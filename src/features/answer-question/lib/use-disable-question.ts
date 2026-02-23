import { useHostPhrases } from "@/entities/host";
import { useTimeoutReturn } from "./use-timeout-return";
import { useGameStore } from "@/entities/game";

export function useDisableQuestion(clear: () => void) {
  const timeoutReturn = useTimeoutReturn();
  const { say } = useHostPhrases();
  const { currentQuestion, setShowCorrectAnswer } = useGameStore();

  return () => {
    clear();
    say({
      eventType: "all_players_incorrect",
      correctAnswer: currentQuestion?.correctAnswer,
    });
    setShowCorrectAnswer(true);
    timeoutReturn();
  };
}
