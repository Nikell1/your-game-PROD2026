import {
  IGameQuestion,
  ITheme,
  THEMES_COUNT,
  TQuestionDifficulty,
} from "@/entities/game";
import { getRandomItems } from "@/shared/lib";
import { filterQuestions } from "./filter-questions";

interface Props {
  setThemes: (themes: ITheme[]) => void;
  setQuestions: (questions: IGameQuestion[]) => void;
  difficulty: TQuestionDifficulty;
  step: number;
}

export async function generateQuestions({
  setThemes,
  difficulty,
  step,
}: Props) {
  const responseThemes = await fetch("/data/themes.json");
  const themes = await responseThemes.json();

  const chosenThemes = getRandomItems<ITheme>(themes, THEMES_COUNT);
  setThemes(chosenThemes);

  const responseQuestions = await fetch("/data/questions.json");
  const questions = await responseQuestions.json();

  const chosenQuestions = filterQuestions({
    questions,
    difficulty,
    chosenThemes,
    step,
  });

  console.log(chosenQuestions);
}
