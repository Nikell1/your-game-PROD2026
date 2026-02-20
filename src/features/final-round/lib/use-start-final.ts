import { IQuestion, ITheme, useGameStore } from "@/entities/game";
import { GAME_ROUTES } from "@/shared/config";
import { getRandomItems } from "@/shared/lib";
import { useRouter } from "next/navigation";

export function useStartFinal() {
  const {
    setFinalQuestion,
    players,
    setPlayers,
    setStatus,
    setActivePlayerId,
  } = useGameStore();
  const router = useRouter();

  function startFinal(
    availableThemes: ITheme[],
    availableQuestions: IQuestion[],
  ) {
    const chosenTheme = getRandomItems<ITheme>(availableThemes, 1)[0];

    const questions = availableQuestions.filter(
      (q) => chosenTheme.id === q.themeId && q.difficulty === "hard",
    );

    const chosenQuestion = getRandomItems<IQuestion>(questions, 1)[0];

    setFinalQuestion(chosenQuestion);

    const passedPlayers = players.filter((p) => p.score > 0);

    setPlayers(passedPlayers);

    setActivePlayerId(null);

    setStatus("FINAL_ROUND");

    router.replace(GAME_ROUTES.FINAL_ROUND);
  }

  return { startFinal };
}
