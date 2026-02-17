import { useAnswerInputStore } from "@/features/answer-question";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";

export function useReturnToTable() {
  const router = useRouter();
  const { resetAnswerInputStore } = useAnswerInputStore();

  return () => {
    resetAnswerInputStore();

    router.push(GAME_ROUTES.ROUND_1);
  };
}
