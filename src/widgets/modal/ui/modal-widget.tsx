import { useModalStore } from "@/shared/model";
import { CatsModal } from "./cat-modal";
import { ModalWrapper } from "./modal-wrapper";
import { AuctionModal } from "./auction-modal";
import { CatModalChosen } from "./cat-modal-chosen";
import {
  createCurrentQuestion,
  DEFAULT_TIMER_SECONDS,
  useGameStore,
} from "@/entities/game";
import { useRouter } from "next/navigation";
import { GAME_ROUTES } from "@/shared/config";

export function ModalWidget() {
  const {
    activePlayerId,
    players,
    currentQuestion,
    setCurrentQuestion,
    setIsTimerActive,
    setTimerSeconds,
  } = useGameStore();
  const { modalState, isCatPlayer, resetModalStore } = useModalStore();

  const router = useRouter();

  const chosenPlayer = players.find((player) => activePlayerId === player.id);

  const classes = "w-170 pt-10! pb-6! gap-12 items-center";

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

  if (modalState === "cat_in_bag") {
    if (isCatPlayer) {
      return (
        <ModalWrapper className={classes}>
          <CatModalChosen
            name={chosenPlayer?.name}
            onLeftClick={() => onClick(100)}
            onRightClick={() => onClick(500)}
          />
        </ModalWrapper>
      );
    } else {
      return (
        <ModalWrapper className={classes}>
          <CatsModal />
        </ModalWrapper>
      );
    }
  }

  if (modalState === "auction") {
    return (
      <ModalWrapper className={classes}>
        <AuctionModal />
      </ModalWrapper>
    );
  }
}
