import {
  DEFAULT_TIMER_SECONDS,
  IGameQuestion,
  useGameStore,
} from "@/entities/game";
import { useAuctionModal } from "@/features/auction";
import { useCatModal } from "@/features/cat-in-bag/lib/use-cat-modal";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";

export function useQuestionClick() {
  const {
    setActivePlayerId,
    setCurrentQuestion,
    setIsTimerActive,
    setTimerSeconds,
    setPrevActivePlayerId,
    activePlayerId,
  } = useGameStore();
  const { showCatModal } = useCatModal();
  const { showAuctionModal } = useAuctionModal();
  const router = useRouter();

  return (question: IGameQuestion) => {
    if (question.specials === "default") {
      setPrevActivePlayerId(activePlayerId);
      setActivePlayerId(null);
      setCurrentQuestion({ ...question, isAnswering: true });
      setIsTimerActive(true);
      setTimerSeconds(DEFAULT_TIMER_SECONDS);

      router.replace(GAME_ROUTES.QUESTION(question.id));
    }

    if (question.specials === "cat_in_bag") {
      showCatModal();
      setActivePlayerId(null);
      setCurrentQuestion({ ...question, isAnswering: false });
    }

    if (question.specials === "auction") {
      setActivePlayerId(null);
      showAuctionModal();
      setCurrentQuestion({ ...question, isAnswering: false });
    }
  };
}
