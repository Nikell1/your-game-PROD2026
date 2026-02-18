import {
  IQuestion,
  ITheme,
  IThemeWithQuestions,
  THEMES_COUNT,
  TQuestionDifficulty,
} from "@/entities/game";
import { getRandomItems } from "@/shared/lib";
import { filterMaterial } from "./filter-material";
import { generateSpecials } from "./generate-specials";

interface Props {
  setMaterial: (material: IThemeWithQuestions[]) => void;
  setUsedThemesIds: (newThemes: string[]) => void;
  setUsedQuestionsIds: (newQuestions: string[]) => void;
  difficulty: TQuestionDifficulty;
  step: number;
  themes: ITheme[];
  questions: IQuestion[];
}

export async function generateQuestions({
  difficulty,
  step,
  setMaterial,
  setUsedQuestionsIds,
  setUsedThemesIds,
  themes,
  questions,
}: Props) {
  const chosenThemes = getRandomItems<ITheme>(themes, THEMES_COUNT);
  const chosenThemesIds = chosenThemes.map((theme) => theme.id);

  const { chosenMaterial, usedQuestionIds } = filterMaterial({
    questions,
    difficulty,
    chosenThemes,
    step,
  });

  const { extraMaterial, newUsedQuestionsIds, newUsedThemesIds } =
    generateSpecials({
      step,
      chosenMaterial,
      allQuestions: questions,
      allThemes: themes,
      difficulty,
      usedThemesIds: chosenThemesIds,
      usedQuestionIds,
    });

  setUsedQuestionsIds(newUsedQuestionsIds);
  setUsedThemesIds(newUsedThemesIds);

  setMaterial(extraMaterial);
}
