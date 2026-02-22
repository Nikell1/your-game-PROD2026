import {
  createCurrentQuestion,
  DEFAULT_TIMER_SECONDS,
  useGameStore,
} from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { useFindPlayerInPlayers } from "@/entities/player";
import { useCustomTimer } from "@/features/timer";
import { GAME_ROUTES } from "@/shared/config";
import { useModalStore } from "@/shared/model";
import { useRouter } from "next/navigation";

export function useCatModalChosen() {
  const { setCurrentQuestion, currentQuestion } = useGameStore();

  const { resetModalStore } = useModalStore();
  const { say } = useHostPhrases();
  const { activePlayerId } = useGameStore();
  const findPlayer = useFindPlayerInPlayers();
  const { start } = useCustomTimer();

  const router = useRouter();

  function onClick(price: number) {
    if (activePlayerId) {
      const activePlayer = findPlayer(activePlayerId);
      setCurrentQuestion(
        createCurrentQuestion(currentQuestion, {
          price: price,
          isAnswering: true,
        }),
      );
      start(DEFAULT_TIMER_SECONDS);
      router.replace(GAME_ROUTES.QUESTION(currentQuestion?.id || "0"));
      resetModalStore();
      say({
        eventType: "cat_in_bag_answer_start",
        playerName: activePlayer?.name,
      });
    }
  }

  return { onClick };
}
