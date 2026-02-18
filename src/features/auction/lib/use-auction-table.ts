import { useEffect } from "react";
import { useAuctionStore } from "../model/auction-store";
import {
  createCurrentQuestion,
  DEFAULT_TIMER_SECONDS,
  useGameStore,
} from "@/entities/game";
import { useRouter } from "next/navigation";
import { GAME_ROUTES } from "@/shared/config";

export function useAuctionTable() {
  const {
    setPlayerBet,
    currentWinnerBet,
    setCurrentWinnerBet,
    setCurrentWinnerId,
    setIsBetAll,
    players,
    currentWinnerId,
    isBetAll,
    setPlayerIsPassed,
    minBet,
    resetAuctionStore,
  } = useAuctionStore();

  const {
    setActivePlayerId,
    setCurrentQuestion,
    currentQuestion,
    setPrevActivePlayerId,
    setIsTimerActive,
    setTimerSeconds,
  } = useGameStore();
  const router = useRouter();

  useEffect(() => {
    const activePlayers = players.filter((p) => !p.isPassed);

    if (activePlayers.length === 1) {
      const winner = activePlayers[0];

      setActivePlayerId(winner.id);
      setPrevActivePlayerId(winner.id);
      setCurrentQuestion(
        createCurrentQuestion(currentQuestion, {
          price: winner.bet,
          isAnswering: true,
          specials: "auction",
        }),
      );
      setIsTimerActive(true);
      setTimerSeconds(DEFAULT_TIMER_SECONDS);
      router.replace(GAME_ROUTES.QUESTION(currentQuestion?.id || "0"));
      resetAuctionStore();
    }
  }, [
    setIsTimerActive,
    setTimerSeconds,
    router,
    players,
    minBet,
    resetAuctionStore,
    currentQuestion,
    setActivePlayerId,
    setCurrentQuestion,
    setPrevActivePlayerId,
  ]);

  function addBetToPlayer(id: number, bet: number) {
    setPlayerBet(id, bet);
    if (currentWinnerBet < bet) {
      setCurrentWinnerBet(bet);
      setCurrentWinnerId(id);
    }
  }

  function betAll(id: number, score: number) {
    setPlayerBet(id, score);
    setCurrentWinnerBet(score);
    setCurrentWinnerId(id);
    setIsBetAll(true);
  }

  function playerPass(id: number) {
    setPlayerIsPassed(id, true);
  }

  return {
    addBetToPlayer,
    betAll,
    players,
    currentWinnerBet,
    currentWinnerId,
    isBetAll,
    playerPass,
  };
}
