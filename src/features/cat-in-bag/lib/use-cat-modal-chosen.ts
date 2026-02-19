import {
  createCurrentQuestion,
  DEFAULT_TIMER_SECONDS,
  useGameStore,
} from "@/entities/game";
import { GAME_ROUTES } from "@/shared/config";
import { useModalStore } from "@/shared/model";
import { useRouter } from "next/navigation";

export function useCatModalChosen() {
  const {
    setCurrentQuestion,
    currentQuestion,
    setIsTimerActive,
    setTimerSeconds,
  } = useGameStore();

  const { resetModalStore } = useModalStore();

  const router = useRouter();

  function onClick(price: number) {
    setCurrentQuestion(
      createCurrentQuestion(currentQuestion, {
        price: price,
        isAnswering: true,
      }),
    );
    setIsTimerActive(true);
    setTimerSeconds(DEFAULT_TIMER_SECONDS);
    router.replace(GAME_ROUTES.QUESTION(currentQuestion?.id || "0"));
    resetModalStore();
  }

  return { onClick };
}
