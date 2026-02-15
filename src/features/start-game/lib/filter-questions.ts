import {
  IGameQuestion,
  IQuestion,
  ITheme,
  QUESTIONS_COUNT,
  TQuestionDifficulty,
} from "@/entities/game";
import { getRandomItems } from "@/shared/lib";

interface Props {
  questions: IQuestion[];
  chosenThemes: ITheme[];
  difficulty: TQuestionDifficulty;
  step: number;
}

export function filterQuestions({
  questions,
  chosenThemes,
  difficulty,
  step,
}: Props): IGameQuestion[] {
  const themeIds = new Set(chosenThemes.map((theme) => theme.id));
  const result: IGameQuestion[] = [];

  const easyQuestions = questions.filter(
    (q) => themeIds.has(q.themeId) && q.difficulty === difficulty,
  );

  for (const theme of chosenThemes) {
    const themeQuestions = easyQuestions.filter((q) => q.themeId === theme.id);
    const randomQuestions = getRandomItems<IQuestion>(
      themeQuestions,
      QUESTIONS_COUNT,
    );

    randomQuestions.forEach((q, index) => {
      result.push({
        ...q,
        price: (index + 1) * step,
      });
    });
  }

  return result;
}
