export type TGameStatus =
  | "NOT_STARTED"
  | "CREATING"
  | "ROUND_1"
  | "ROUND_2"
  | "FINAL_ROUND"
  | "ENDING"
  | "FINISHED";

export interface ITheme {
  id: string;
  label: string;
}

export type TQuestionDifficulty = "easy" | "medium" | "hard";

export interface IQuestion {
  id: string;
  themeId: string;
  label: string;
  correctAnswer: string;
  difficulty: TQuestionDifficulty;
}

export interface IGameQuestion extends IQuestion {
  price: number;
}
