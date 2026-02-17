import { QUESTIONS_COUNT, THEMES_COUNT, useGameStore } from "@/entities/game";
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

        clear();

        setCurrentQuestion(null);

        if (answeredQuestionsIds.length === THEMES_COUNT * QUESTIONS_COUNT) {
          console.log("new round");
        }

        returnToTable();
      } else {
        setIsCorrect(false);

        decreaseScore(activePlayerId, currentQuestion.price);

        resume();

        setIsTimerActive(true);

        setActivePlayerId(null);
      }
    } else {
      setIsCorrect(null);
    }
  }
  return { answerHandler, isCorrect, currentQuestion, activePlayerId, isOnDev };
}
