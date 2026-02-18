import { useGameStore } from "@/entities/game";
import { useManageScore } from "@/features/manage-user-score";
import { useReturnToTable } from "@/features/return-to-table";

export function useAnswerTimeout() {
  const {
    currentQuestion,
    answeredQuestionsIds,
    setAnsweredQuestionsIds,
    setCurrentQuestion,
    setActivePlayerId,
    prevActivePlayerId,
    setSpecials,
  } = useGameStore();

  const returnToTable = useReturnToTable();

  const { decreaseScore } = useManageScore();
  return () => {
    if (currentQuestion) {
      const newAnswered = [currentQuestion.id, ...answeredQuestionsIds];

      setAnsweredQuestionsIds(newAnswered);

      setCurrentQuestion(null);

      setActivePlayerId(prevActivePlayerId);

      setSpecials("default");

      if (
        currentQuestion.specials === "auction" ||
        currentQuestion.specials === "cat_in_bag"
      ) {
        decreaseScore(prevActivePlayerId || -1, currentQuestion.price);
      }

      returnToTable();
    }
  };
}
