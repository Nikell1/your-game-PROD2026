import { useGameStore } from "@/entities/game";
import { useManageScore } from "@/features/manage-user-score";
import { useAnswerInputStore } from "../model/answer-input.store";

export function useAnswerQuestion() {
  const { currentQuestionId, questions, activePlayerId, setActivePlayerId } =
    useGameStore();
  const { increaseScore, decreaseScore } = useManageScore();
  const { isCorrect, setIsCorrect } = useAnswerInputStore();

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  function answerHandler(answer: string) {
    if (currentQuestion && activePlayerId) {
      if (currentQuestion.correctAnswer === answer) {
        setIsCorrect(true);
        increaseScore(activePlayerId, currentQuestion.price);
      } else {
        setIsCorrect(false);
        decreaseScore(activePlayerId, currentQuestion.price);
      }

      setActivePlayerId(null);
    } else {
      setIsCorrect(null);
    }
  }
  return { answerHandler, isCorrect };
}
