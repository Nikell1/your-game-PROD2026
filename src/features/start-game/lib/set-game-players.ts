import { IActivePlayer, ISetupPlayer } from "@/entities/player";

interface Props {
  playersData: ISetupPlayer[];
  setPlayers: (players: IActivePlayer[]) => void;
}

export function setGamePlayers({ playersData, setPlayers }: Props) {
  const activePlayers: IActivePlayer[] = playersData.map((player, index) => ({
    ...player,
    id: index + 1,
    score: 0,
  }));

  setPlayers(activePlayers);
}
