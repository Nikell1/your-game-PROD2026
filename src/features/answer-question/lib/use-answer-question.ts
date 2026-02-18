import { useGameStore } from "@/entities/game";
import { useManageScore } from "@/features/manage-user-score";
import { useAnswerInputStore } from "../model/answer-input-store";
import { useReturnToTable } from "@/features/return-to-table";

export function useAnswerQuestion(clear: () => void, resume: () => void) {
  const {
    activePlayerId,
    setActivePlayerId,
    isOnDev,
    setAnsweredQuestionsIds,
    answeredQuestionsIds,
    currentQuestion,
    setCurrentQuestion,
    setIsTimerActive,
    setSpecials,
    specials,
  } = useGameStore();

  const { increaseScore, decreaseScore } = useManageScore();
  const { isCorrect, setIsCorrect } = useAnswerInputStore();
  const returnToTable = useReturnToTable();

  function answerHandler(answer: string) {
    if (currentQuestion && activePlayerId) {
      if (
        currentQuestion.correctAnswer.toLowerCase().replace(/\s/g, "") ===
        answer.toLowerCase().replace(/\s/g, "")
      ) {
        setIsCorrect(true);

        increaseScore(activePlayerId, currentQuestion.price);

        const newAnswered = [currentQuestion.id, ...answeredQuestionsIds];

        setAnsweredQuestionsIds(newAnswered);

        setSpecials("default");

        clear();

        setCurrentQuestion(null);

        returnToTable();
      } else {
        decreaseScore(activePlayerId, currentQuestion.price);

        if (specials === "default") {
          setIsCorrect(false);

          resume();

          setIsTimerActive(true);

          setActivePlayerId(null);
        } else if (specials === "auction" || specials === "cat_in_bag") {
          const newAnswered = [currentQuestion.id, ...answeredQuestionsIds];

          setAnsweredQuestionsIds(newAnswered);

          setSpecials("default");

          clear();

          setCurrentQuestion(null);

          returnToTable();
        }
      }
    } else {
      setIsCorrect(null);
    }
  }
  return { answerHandler, isCorrect, currentQuestion, activePlayerId, isOnDev };
}
