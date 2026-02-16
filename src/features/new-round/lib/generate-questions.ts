import {
  ITheme,
  IThemeWithQuestions,
  ROUND_1_PRICE_STEP,
  THEMES_COUNT,
  TQuestionDifficulty,
} from "@/entities/game";
import { getRandomItems } from "@/shared/lib";
import { filterMaterial } from "./filter-material";
import { generateCats } from "@/features/cat-in-bag";

interface Props {
  setMaterial: (material: IThemeWithQuestions[]) => void;
  setUsedThemesIds: (newThemes: string[]) => void;
  setUsedQuestionsIds: (newQuestions: string[]) => void;
  difficulty: TQuestionDifficulty;
  step: number;
}

export async function generateQuestions({
  difficulty,
  step,
  setMaterial,
  setUsedQuestionsIds,
  setUsedThemesIds,
}: Props) {
  const responseThemes = await fetch("/data/themes.json");
  const themes = await responseThemes.json();

  const chosenThemes = getRandomItems<ITheme>(themes, THEMES_COUNT);
  const chosenThemesIds = chosenThemes.map((theme) => theme.id);

  const responseQuestions = await fetch("/data/questions.json");
  const questions = await responseQuestions.json();

  const { chosenMaterial, usedQuestionIds } = filterMaterial({
    questions,
    difficulty,
    chosenThemes,
    step,
  });

  const { extraMaterial, newUsedQuestionsIds, newUsedThemesIds } = generateCats(
    {
      step: ROUND_1_PRICE_STEP,
      chosenMaterial,
      allQuestions: questions,
      allThemes: themes,
      difficulty,
      usedThemesIds: chosenThemesIds,
      usedQuestionIds,
    },
  );

  setUsedQuestionsIds(newUsedQuestionsIds);
  setUsedThemesIds(newUsedThemesIds);

  setMaterial(extraMaterial);
}
