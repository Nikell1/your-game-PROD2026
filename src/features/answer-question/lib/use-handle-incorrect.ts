import { IActivePlayer } from "@/entities/player";
import { useManageScore } from "@/features/manage-user-score";
import { useAnswerInputStore } from "../model/answer-input-store";
import { useGameStore } from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { useTimeoutReturn } from "./use-timeout-return";

export function useHandleIncorrect(clear: () => void, resume: () => void) {
  const { decreaseScore } = useManageScore();
  const { setIsCorrect, pushDisabledPlayerIds } = useAnswerInputStore();
  const {
    activePlayerId,
    currentQuestion,
    specials,
    setActivePlayerId,
    setShowCorrectAnswer,
  } = useGameStore();

  const { say } = useHostPhrases();
  const timeoutReturn = useTimeoutReturn();

  return (activePlayer: IActivePlayer) => {
    if (activePlayerId && currentQuestion) {
      decreaseScore(activePlayerId, currentQuestion.price);
      setIsCorrect(false);

      if (specials === "default") {
        resume();

        pushDisabledPlayerIds(activePlayerId);

        setActivePlayerId(null);

        say({
          eventType: "regular_incorrect_answer",
          playerName: activePlayer?.name || null,
          price: currentQuestion.price,
        });
      } else if (specials === "auction" || specials === "cat_in_bag") {
        clear();
        setShowCorrectAnswer(true);
        if (specials === "cat_in_bag") {
          say({
            eventType: "cat_in_bag_incorrect",
            playerName: activePlayer?.name || null,
            price: currentQuestion.price,
          });
        }
        if (specials === "auction") {
          say({
            eventType: "auction_incorrect_answer",
            playerName: activePlayer?.name || null,
            price: currentQuestion.price,
          });
        }
        timeoutReturn();
      }
    }
  };
}
