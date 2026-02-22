import { useReturnToTable } from "@/features/return-to-table";
import { useGameStore } from "@/entities/game";
import { useAnswerInputStore } from "../model/answer-input-store";
import { useManageScore } from "@/features/manage-user-score";
import { useHostPhrases } from "@/entities/host";
import { IActivePlayer } from "@/entities/player";

export function useHandleCorrectAnswer(clear: () => void) {
  const {
    activePlayerId,
    currentQuestion,
    answeredQuestionsIds,
    setCurrentQuestion,
    setAnsweredQuestionsIds,
    setSpecials,
  } = useGameStore();
  const { setIsCorrect } = useAnswerInputStore();
  const { increaseScore } = useManageScore();
  const { say } = useHostPhrases();
  const returnToTable = useReturnToTable();

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
      setTimeout(() => {
        const newAnswered = [currentQuestion.id, ...answeredQuestionsIds];

        setCurrentQuestion(null);
        setAnsweredQuestionsIds(newAnswered);

        setSpecials("default");

        returnToTable();

        say({
          eventType: "question_table_open",
          playerName: activePlayer?.name || null,
        });
      }, 3000);
    }
  };
}
