import {
  CATS_COUNT,
  IGameQuestion,
  IQuestion,
  ITheme,
  IThemeWithQuestions,
  QUESTIONS_COUNT,
  THEMES_COUNT,
  TQuestionDifficulty,
} from "@/entities/game";
import { getRandomItems } from "@/shared/lib";
import { getRandomCellPositions } from "./generate-positions";

interface Props {
  chosenMaterial: IThemeWithQuestions[];
  allThemes: ITheme[];
  allQuestions: IQuestion[];
  usedThemesIds: string[];
  usedQuestionIds: string[];
  difficulty: TQuestionDifficulty;
  step: number;
}

export function generateCats({
  chosenMaterial,
  allThemes,
  usedThemesIds,
  usedQuestionIds,
  difficulty,
  allQuestions,
  step,
}: Props): {
  extraMaterial: IThemeWithQuestions[];
  newUsedThemesIds: string[];
  newUsedQuestionsIds: string[];
} {
  const result = chosenMaterial.map((item) => ({
    theme: { ...item.theme },
    questions: [...item.questions],
  }));

  const updatedUsedThemesIds = new Set(usedThemesIds);
  const updatedUsedQuestionsIds = new Set(usedQuestionIds);

  const specialPositions = getRandomCellPositions(
    THEMES_COUNT,
    QUESTIONS_COUNT,
    CATS_COUNT,
  );

  for (const pos of specialPositions) {
    const { themeIndex, priceIndex } = pos;

    const availableThemes = allThemes.filter(
      (theme) => !updatedUsedThemesIds.has(theme.id),
    );

    const randomTheme = getRandomItems(availableThemes, 1)[0];
    updatedUsedThemesIds.add(randomTheme.id);

    const themeQuestions = allQuestions.filter(
      (q) =>
        q.themeId === randomTheme.id &&
        q.difficulty === difficulty &&
        !updatedUsedQuestionsIds.has(q.id),
    );

    const randomQuestion = getRandomItems(themeQuestions, 1)[0];
    updatedUsedQuestionsIds.add(randomQuestion.id);

    const catQuestion: IGameQuestion = {
      ...randomQuestion,
      price: (priceIndex + 1) * step,
      specials: "cat_in_bag",
    };

    if (result[themeIndex] && result[themeIndex].questions[priceIndex]) {
      result[themeIndex].questions[priceIndex] = catQuestion;
    }
  }

  return {
    extraMaterial: result,
    newUsedThemesIds: Array.from(updatedUsedThemesIds),
    newUsedQuestionsIds: Array.from(updatedUsedQuestionsIds),
  };
}
