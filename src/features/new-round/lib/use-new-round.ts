import {
  IQuestion,
  ITheme,
  ROUND_1_PRICE_STEP,
  ROUND_2_PRICE_STEP,
  useGameStore,
} from "@/entities/game";
import { ISetupPlayer } from "@/entities/player";
import { GAME_ROUTES } from "@/shared/config";
import { useRouter } from "next/navigation";
import { setGamePlayers } from "./set-game-players";
import { generateQuestions } from "./generate-questions";
import { useAnswerInputStore } from "@/features/answer-question";
import { useAuctionStore } from "@/features/auction";
import { useModalStore } from "@/shared/model";
import { useStartFinal } from "@/features/final-round";

interface Props {
  playersData?: ISetupPlayer[];
  resetSetupGameStore?: () => void;
}

export function useNewRound() {
  const {
    setPlayers,
    setStatus,
    setMaterial,
    setActivePlayerId,
    setAnsweredQuestionsIds,
    setUsedQuestionsIds,
    setUsedThemesIds,
    resetStore,
    status,
    resetRound,
    usedThemesIds,
    usedQuestionsIds,
  } = useGameStore();
  const router = useRouter();

  const { resetAnswerInputStore } = useAnswerInputStore();

  const { resetModalStore } = useModalStore();

  const { resetAuctionStore } = useAuctionStore();

  const { startFinal } = useStartFinal();

  return async ({ playersData, resetSetupGameStore }: Props) => {
    const responseThemes = await fetch("/data/themes.json");
    const themes: ITheme[] = await responseThemes.json();

    const responseQuestions = await fetch("/data/questions.json");
    const questions: IQuestion[] = await responseQuestions.json();

    setAnsweredQuestionsIds([]);
    resetAuctionStore();
    resetAnswerInputStore();
    resetModalStore();

    if (status === "CREATING" && resetSetupGameStore && playersData) {
      setActivePlayerId(1);
      resetSetupGameStore();
      resetStore();
      setGamePlayers({ playersData, setPlayers });
      setStatus("ROUND_1");
      generateQuestions({
        themes,
        questions,
        setMaterial,
        setUsedQuestionsIds,
        setUsedThemesIds,
        difficulty: "easy",
        step: ROUND_1_PRICE_STEP,
      });
      router.replace(GAME_ROUTES.ROUND_1);
    }

    if (status === "ROUND_1" || status === "ROUND_2") {
      const availableThemes = themes.filter(
        (theme) => !usedThemesIds.includes(theme.id),
      );

      const availableQuestions = questions.filter(
        (question) => !usedQuestionsIds.includes(question.id),
      );

      if (status === "ROUND_1") {
        setStatus("ROUND_2");
        resetRound();
        generateQuestions({
          themes: availableThemes,
          questions: availableQuestions,
          setMaterial,
          setUsedQuestionsIds,
          setUsedThemesIds,
          difficulty: "medium",
          step: ROUND_2_PRICE_STEP,
        });
        router.replace(GAME_ROUTES.ROUND_2);
      } else if (status === "ROUND_2") {
        startFinal(availableThemes, availableQuestions);
      }
    }
  };
}
