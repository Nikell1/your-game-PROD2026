import { useGameStore } from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { useManageScore } from "@/features/manage-user-score";
import { useReturnToTable } from "@/features/return-to-table";

export function useAnswerTimeout(clear: () => void) {
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
  const { say } = useHostPhrases();

  const { decreaseScore } = useManageScore();
  return () => {
    if (currentQuestion) {
      clear();
      console.log(1);
      if (
        currentQuestion.specials === "auction" ||
        currentQuestion.specials === "cat_in_bag"
      ) {
        decreaseScore(prevActivePlayerId || -1, currentQuestion.price);
      }
      say({ eventType: "timer_expired" });
      setTimeout(() => {
        const newAnswered = [currentQuestion.id, ...answeredQuestionsIds];

        setAnsweredQuestionsIds(newAnswered);

        setCurrentQuestion(null);

        setActivePlayerId(prevActivePlayerId);

        setSpecials("default");

        returnToTable();
        say({ eventType: "question_table_open" });
      }, 3000);
    }
  };
}
