import { useGameStore } from "@/entities/game";
import { useReturnToTable } from "@/features/return-to-table";

export function useAnswerTimeout() {
  const {
    currentQuestion,
    answeredQuestionsIds,
    setAnsweredQuestionsIds,
    setCurrentQuestion,
  } = useGameStore();
  const returnToTable = useReturnToTable();
  return () => {
    if (currentQuestion) {
      const newAnswered = [currentQuestion.id, ...answeredQuestionsIds];

      setAnsweredQuestionsIds(newAnswered);

      setCurrentQuestion(null);

      returnToTable();
    }
  };
}
