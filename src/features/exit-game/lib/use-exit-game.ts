import { useGameStore } from "@/entities/game";
import { useModalStore } from "@/shared/model";
import { useRouter } from "next/navigation";

export function useExitGame() {
  const { setModalState } = useModalStore();
  const { resetStore } = useGameStore();
  const router = useRouter();

  function back() {
    setModalState("closed");
  }

  function exit() {
    router.replace("/");
    resetStore();
    setModalState("closed");
  }

  return { back, exit };
}
