import { IGameQuestion, useGameStore } from "@/entities/game";
import { useCatModal } from "@/features/cat-in-bag/lib/use-cat-modal";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";

export function useQuestionClick() {
  const { setActivePlayerId, setCurrentQuestion } = useGameStore();
  const { showCatModal } = useCatModal();
  const router = useRouter();

  return (question: IGameQuestion) => {
    if (question.specials === "default") {
      setActivePlayerId(null);
      setCurrentQuestion(question);

      router.replace(GAME_ROUTES.QUESTION(question.id));
    }

    if (question.specials === "cat_in_bag") {
      showCatModal();
    }
  };
}
