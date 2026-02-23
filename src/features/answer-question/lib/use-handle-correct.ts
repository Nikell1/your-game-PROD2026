import { useGameStore } from "@/entities/game";
import { useAnswerInputStore } from "../model/answer-input-store";
import { useManageScore } from "@/features/manage-user-score";
import { useHostPhrases } from "@/entities/host";
import { IActivePlayer } from "@/entities/player";
import { useTimeoutReturn } from "./use-timeout-return";

export function useHandleCorrectAnswer(clear: () => void) {
  const { activePlayerId, currentQuestion, setShowCorrectAnswer } =
    useGameStore();
  const { setIsCorrect } = useAnswerInputStore();
  const { increaseScore } = useManageScore();
  const { say } = useHostPhrases();
  const timeoutReturn = useTimeoutReturn();

  return (activePlayer: IActivePlayer) => {
    if (currentQuestion && activePlayerId) {
      setIsCorrect(true);
      clear();
      increaseScore(activePlayerId, currentQuestion.price);
      if (currentQuestion.specials === "default") {
        say({
          eventType: "regular_correct_answer",
          playerName: activePlayer?.name,
          price: currentQuestion.price,
        });
      }
      if (currentQuestion.specials === "cat_in_bag") {
        say({
          eventType: "cat_in_bag_correct",
          playerName: activePlayer?.name,
          price: currentQuestion.price,
        });
      }
      if (currentQuestion.specials === "auction") {
        say({
          eventType: "auction_correct_answer",
          playerName: activePlayer?.name,
          price: currentQuestion.price,
        });
      }
      setShowCorrectAnswer(true);
      timeoutReturn();
    }
  };
}
