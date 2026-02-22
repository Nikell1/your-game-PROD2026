import { useEffect } from "react";
import { useAuctionStore } from "../model/auction-store";
import {
  createCurrentQuestion,
  DEFAULT_TIMER_SECONDS,
  useGameStore,
} from "@/entities/game";
import { useRouter } from "next/navigation";
import { GAME_ROUTES } from "@/shared/config";
import { useHostPhrases } from "@/entities/host";
import { useFindPlayerInPlayers } from "@/entities/player";
import { useCustomTimer } from "@/features/timer";

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
  } = useGameStore();
  const router = useRouter();
  const { say } = useHostPhrases();
  const findPlayer = useFindPlayerInPlayers();
  const { start } = useCustomTimer();

  useEffect(() => {
    const activePlayers = players.filter((p) => !p.isPassed);

    if (activePlayers.length === 1) {
      const winner = activePlayers[0];
      // say({ eventType: "auction_winner", playerName: winner.name });
      setTimeout(() => {
        setActivePlayerId(winner.id);
        setPrevActivePlayerId(winner.id);
        setCurrentQuestion(
          createCurrentQuestion(currentQuestion, {
            price: winner.bet,
            isAnswering: true,
            specials: "auction",
          }),
        );
        start(DEFAULT_TIMER_SECONDS);
        router.replace(GAME_ROUTES.QUESTION(currentQuestion?.id || "0"));
        resetAuctionStore();
        say({
          eventType: "auction_question_start",
          playerName: winner.name,
          price: winner.bet,
        });
      }, 3000);
    }
  }, [
    say,
    start,
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
    const player = findPlayer(id);
    say({
      eventType: "auction_bet_placed",
      playerName: player?.name,
      bet: bet,
    });
    if (currentWinnerBet < bet) {
      setCurrentWinnerBet(bet);
      setCurrentWinnerId(id);
    }
  }

  function betAll(id: number, score: number) {
    const player = findPlayer(id);
    say({
      eventType: "auction_bet_all",
      playerName: player?.name,
    });
    setPlayerBet(id, score);
    setCurrentWinnerBet(score);
    setCurrentWinnerId(id);
    setIsBetAll(true);
  }

  function playerPass(id: number) {
    setPlayerIsPassed(id, true);
    const player = findPlayer(id);
    say({
      eventType: "auction_pass",
      playerName: player?.name,
    });
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
