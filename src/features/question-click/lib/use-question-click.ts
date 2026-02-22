import {
  DEFAULT_TIMER_SECONDS,
  IGameQuestion,
  useGameStore,
} from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { useAuctionModal } from "@/features/auction";
import { useCatModal } from "@/features/cat-in-bag/lib/use-cat-modal";
import { useCustomTimer } from "@/features/timer";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";

export function useQuestionClick() {
  const {
    setActivePlayerId,
    setCurrentQuestion,
    setPrevActivePlayerId,
    activePlayerId,
  } = useGameStore();
  const { showCatModal } = useCatModal();
  const { showAuctionModal } = useAuctionModal();
  const router = useRouter();
  const { say } = useHostPhrases();
  const { start } = useCustomTimer();

  return (question: IGameQuestion) => {
    if (question.specials === "default") {
      setPrevActivePlayerId(activePlayerId);
      setActivePlayerId(null);
      setCurrentQuestion({ ...question, isAnswering: true });
      start(DEFAULT_TIMER_SECONDS);

      router.replace(GAME_ROUTES.QUESTION(question.id));
      say({ eventType: "question_selected", price: question.price });
    }

    if (question.specials === "cat_in_bag") {
      showCatModal();
      setActivePlayerId(null);
      setCurrentQuestion({ ...question, isAnswering: false });
      say({ eventType: "cat_in_bag_open" });
    }

    if (question.specials === "auction") {
      setActivePlayerId(null);
      showAuctionModal();
      setCurrentQuestion({ ...question, isAnswering: false });
      say({ eventType: "auction_open" });
    }
  };
}
