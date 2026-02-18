import { useModalStore } from "@/shared/model";
import { CatsModal } from "./cat-modal";
import { ModalWrapper } from "./modal-wrapper";
import { AuctionModal } from "./auction-modal";
import { CatModalChosen } from "./cat-modal-chosen";
import {
  createCurrentQuestion,
  DEFAULT_TIMER_SECONDS,
  QUESTIONS_COUNT,
  ROUND_1_PRICE_STEP,
  ROUND_2_PRICE_STEP,
  useGameStore,
} from "@/entities/game";
import { useRouter } from "next/navigation";
import { GAME_ROUTES } from "@/shared/config";
import { RoundResultsModal } from "./round-results-modal";

export function ModalWidget() {
  const {
    activePlayerId,
    players,
    currentQuestion,
    setCurrentQuestion,
    setIsTimerActive,
    setTimerSeconds,
    status,
  } = useGameStore();
  const { modalState, isCatPlayer, resetModalStore } = useModalStore();

  const router = useRouter();

  const chosenPlayer = players.find((player) => activePlayerId === player.id);

  const classes = "w-170 pt-10! pb-6! gap-12 items-center";

  const bet = status === "ROUND_1" ? ROUND_1_PRICE_STEP : ROUND_2_PRICE_STEP;

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
            bet={bet}
            name={chosenPlayer?.name}
            onLeftClick={() => onClick(bet)}
            onRightClick={() => onClick(bet * QUESTIONS_COUNT)}
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

  if (modalState === "round_results") {
    return (
      <ModalWrapper className="w-155 p-10 gap-12 items-center">
        <RoundResultsModal />
      </ModalWrapper>
    );
  }
}
