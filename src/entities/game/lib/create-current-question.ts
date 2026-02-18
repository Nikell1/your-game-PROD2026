import { ICurrentQuestion, IQuestion } from "../game-types";

export function createCurrentQuestion(
  base: IQuestion | ICurrentQuestion | null,
  overrides: Partial<ICurrentQuestion>,
): ICurrentQuestion {
  const defaults = {
    id: base?.id || "",
    themeId: base?.themeId || "",
    themeLabel: base?.themeLabel || "",
    label: base?.label || "",
    correctAnswer: base?.correctAnswer || "",
    difficulty: base?.difficulty || "easy",
    price: 0,
    isAnswering: false,
    specials: "default" as const,
  };

  return { ...defaults, ...base, ...overrides };
}
