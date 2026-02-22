import { useGameStore } from "@/entities/game";
import { useAnswerInputStore } from "../model/answer-input-store";
import { useFindPlayerInPlayers } from "@/entities/player";
import { useHandleCorrectAnswer } from "./handle-correct-answer";
import { useHandleIncorrect } from "./use-handle-incorrect";

export function useAnswerQuestion(clear: () => void, resume: () => void) {
  const { activePlayerId, isOnDev, currentQuestion } = useGameStore();

  const { isCorrect, setIsCorrect } = useAnswerInputStore();
  const findPlayer = useFindPlayerInPlayers();
  const handleCorrectAnswer = useHandleCorrectAnswer(clear);
  const handleIncorrectAnswer = useHandleIncorrect(clear, resume);

  function answerHandler(answer: string) {
    if (currentQuestion && activePlayerId) {
      const activePlayer = findPlayer(activePlayerId);
      if (
        currentQuestion.correctAnswer.toLowerCase().replace(/\s/g, "") ===
          answer.toLowerCase().replace(/\s/g, "") &&
        activePlayer
      ) {
        handleCorrectAnswer(activePlayer);
      } else if (activePlayer) {
        handleIncorrectAnswer(activePlayer);
      }
    } else {
      setIsCorrect(null);
    }
  }
  return { answerHandler, isCorrect, currentQuestion, activePlayerId, isOnDev };
}
