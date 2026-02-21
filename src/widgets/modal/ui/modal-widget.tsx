import { useModalStore } from "@/shared/model";
import { CatsModal } from "./cat-modal";
import { ModalWrapper } from "./modal-wrapper";
import { AuctionModal } from "./auction-modal";
import { CatModalChosen } from "./cat-modal-chosen";
import {
  QUESTIONS_COUNT,
  ROUND_1_PRICE_STEP,
  ROUND_2_PRICE_STEP,
  useGameStore,
} from "@/entities/game";
import { RoundResultsModal } from "./round-results-modal";
import { useCatModalChosen } from "@/features/cat-in-bag";
import { FinalBetModal } from "./final-bet-modal";
import { ExitModal } from "./exit-modal";

export function ModalWidget() {
  const { activePlayerId, players, status } = useGameStore();
  const { modalState, isCatPlayer, setModalState } = useModalStore();
  const { onClick } = useCatModalChosen();

  const chosenPlayer = players.find((player) => activePlayerId === player.id);
  const classes = "w-170 pt-10! pb-6! gap-12 items-center";
  const bet = status === "ROUND_1" ? ROUND_1_PRICE_STEP : ROUND_2_PRICE_STEP;

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

  if (modalState === "final_bet") {
    return (
      <ModalWrapper className="w-120 p-8! gap-6 items-center">
        <FinalBetModal />
      </ModalWrapper>
    );
  }

  if (modalState === "exit_submit") {
    return (
      <ModalWrapper
        className="w-140 p-8! gap-6 items-center"
        close={() => setModalState("closed")}
      >
        <ExitModal />
      </ModalWrapper>
    );
  }
}
