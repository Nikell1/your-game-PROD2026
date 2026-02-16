import { TGameStatus } from "../game-types";

export function getRoundTitle(status: TGameStatus | string): string {
  if (status === "ROUND_1" || status === "1") return "Раунд 1";
  if (status === "ROUND_2" || status === "2") return "Раунд 2";
  return "Финальный Раунд";
}
