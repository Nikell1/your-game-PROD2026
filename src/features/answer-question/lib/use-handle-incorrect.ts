import { IActivePlayer } from "@/entities/player";
import { useManageScore } from "@/features/manage-user-score";
import { useAnswerInputStore } from "../model/answer-input-store";
import { useGameStore } from "@/entities/game";
import { useReturnToTable } from "@/features/return-to-table";
import { useHostPhrases } from "@/entities/host";

export function useHandleIncorrect(clear: () => void, resume: () => void) {
  const { decreaseScore } = useManageScore();
  const { setIsCorrect } = useAnswerInputStore();
  const {
    activePlayerId,
    currentQuestion,
    specials,
    setActivePlayerId,
    answeredQuestionsIds,
    setAnsweredQuestionsIds,
    setSpecials,
    setCurrentQuestion,
  } = useGameStore();

  const returnToTable = useReturnToTable();
  const { say } = useHostPhrases();

  return (activePlayer: IActivePlayer) => {
    if (activePlayerId && currentQuestion) {
      decreaseScore(activePlayerId, currentQuestion.price);
      setIsCorrect(false);

      if (specials === "default") {
        resume();

        setActivePlayerId(null);

        say({
          eventType: "regular_incorrect_answer",
          playerName: activePlayer?.name || null,
          price: currentQuestion.price,
        });
      } else if (specials === "auction" || specials === "cat_in_bag") {
        clear();
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
        setTimeout(() => {
          const newAnswered = [currentQuestion.id, ...answeredQuestionsIds];

          setAnsweredQuestionsIds(newAnswered);

          setSpecials("default");

          setCurrentQuestion(null);

          returnToTable();
          say({ eventType: "question_table_open" });
        }, 3000);
      }
    }
  };
}
