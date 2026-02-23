import { useReturnToTable } from "@/features/return-to-table";
import { useGameStore } from "@/entities/game";
import { useHostPhrases } from "@/entities/host";

export function useFinalQuestionTimeout(clear: () => void) {
  const { setFinalAnswers } = useGameStore();
  const returnToTable = useReturnToTable();
  const { say } = useHostPhrases();

  return () => {
    setFinalAnswers(false, "");
    clear();

    say({ eventType: "timer_expired" });
    setTimeout(() => {
      returnToTable();
    }, 3000);
  };
}
