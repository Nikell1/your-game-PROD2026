import { useModalStore } from "@/shared/model";
import { useCatModalChosen } from "@/features/cat-in-bag";
import {
  QUESTIONS_COUNT,
  ROUND_1_PRICE_STEP,
  ROUND_2_PRICE_STEP,
  useGameStore,
} from "@/entities/game";
import {
  AuctionModal,
  AvatarModal,
  CatModalChosen,
  CatsModal,
  ExitModal,
  FinalBetModal,
  ModalWrapper,
  RoundResultsModal,
} from "./modals";

export function ModalWidget() {
  const { activePlayerId, players, status, currentQuestion } = useGameStore();
  const { modalState, isCatPlayer, setModalState } = useModalStore();
  const { onClick } = useCatModalChosen();
  const chosenPlayer = players.find((player) => activePlayerId === player.id);
  const classes = "w-170 pt-10! pb-6! gap-12 items-center";
  const bet = status === "ROUND_1" ? ROUND_1_PRICE_STEP : ROUND_2_PRICE_STEP;
  const canClose = modalState === "add_avatar" || modalState === "exit_submit";

  const getWrapperClassName = () => {
    switch (modalState) {
      case "round_results":
        return "w-155 p-10 gap-12 items-center";
      case "final_bet":
      case "exit_submit":
        return "w-140 p-8! gap-6 items-center";
      case "add_avatar":
        return "w-220 p-8! gap-6 items-center";
      default:
        return classes;
    }
  };

  return (
    <ModalWrapper
      close={canClose ? () => setModalState("closed") : () => {}}
      isOpen={modalState !== "closed"}
      className={getWrapperClassName()}
    >
      {modalState === "cat_in_bag" && isCatPlayer && (
        <CatModalChosen
          currentQuestion={currentQuestion}
          bet={bet}
          name={chosenPlayer?.name}
          onLeftClick={() => onClick(bet)}
          onRightClick={() => onClick(bet * QUESTIONS_COUNT)}
        />
      )}
      {modalState === "cat_in_bag" && !isCatPlayer && <CatsModal />}
      {modalState === "auction" && <AuctionModal />}
      {modalState === "round_results" && <RoundResultsModal />}
      {modalState === "final_bet" && <FinalBetModal />}
      {modalState === "exit_submit" && <ExitModal />}
      {modalState === "add_avatar" && <AvatarModal />}
    </ModalWrapper>
  );
}
