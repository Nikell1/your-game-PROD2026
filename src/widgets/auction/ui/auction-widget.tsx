import { useGameStore } from "@/entities/game";
import { useAuctionStore } from "@/features/auction/model/auction-store";
import { AuctionIcon, Button, Frame } from "@/shared/ui";

export function AuctionWidget() {
  const { currentQuestion } = useGameStore();
  const {
    players,
    currentWinnerId,
    setPlayerBet,
    currentWinnerBet,
    setPlayerIsPassed,
    setCurrentWinnerBet,
    setCurrentWinnerId,
  } = useAuctionStore();

  function addBetToPlayer(id: number, bet: number) {
    setPlayerBet(id, bet + 100);
    if (currentWinnerBet < bet + 100) {
      setCurrentWinnerBet(bet + 100);
      setCurrentWinnerId(id);
    }
  }

  return (
    <Frame className="rounded-xl max-h-120 gap-6 flex-col p-4">
      <div className="flex justify-between w-full">
        <div className="flex gap-4 items-center">
          <AuctionIcon className="size-10" />
          <h2 className="text-2xl font-bold">Аукцион</h2>
        </div>

        <Frame className="w-70 p-2 text-xl rounded-lg">
          Тема: {currentQuestion?.themeLabel}
        </Frame>
      </div>

      {players.map((player) => {
        const isPassDisabled = currentWinnerId < 0 || player.isPassed;
        const isAddBetDisabled =
          player.isPassed || player.score <= currentWinnerBet;
        const isBetAllDisabled =
          player.isPassed || player.score <= currentWinnerBet;

        return (
          <div key={player.id} className="w-full flex gap-4">
            <Frame className="py-2 px-6 text-2xl rounded-lg w-80">
              {player.name}
            </Frame>
            <Frame className="py-2 px-6 text-2xl rounded-lg w-51">
              Ставка: {player.bet}
            </Frame>
            <Frame className="gap-14 rounded-lg py-2 px-4">
              <Button
                disabled={isPassDisabled}
                onClick={() => setPlayerIsPassed(player.id, true)}
                className="border-foreground bg-foreground/15 hover:bg-foreground/30"
              >
                Пас
              </Button>
              <Button
                onClick={() => addBetToPlayer(player.id, player.bet)}
                disabled={isAddBetDisabled}
                className="border-success bg-success/15 hover:bg-success/30"
              >
                Добавить
              </Button>
              <Button
                onClick={() => setPlayerBet(player.id, player.score)}
                className="border-destructive bg-destructive/15 hover:bg-destructive/30"
                disabled={isBetAllDisabled}
              >
                Ва-банк
              </Button>
            </Frame>
          </div>
        );
      })}
    </Frame>
  );
}
