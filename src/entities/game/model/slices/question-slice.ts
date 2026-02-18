import { StateCreator } from "zustand";
import {
  ICurrentQuestion,
  IThemeWithQuestions,
  TQuestionSpecials,
} from "../../game-types";

export interface QuestionSlice {
  currentQuestion: ICurrentQuestion | null;
  answeredQuestionsIds: string[];
  specials: TQuestionSpecials;
  material: IThemeWithQuestions[];

  setCurrentQuestion: (question: ICurrentQuestion | null) => void;
  setAnsweredQuestionsIds: (answeredQuesitons: string[]) => void;
  setSpecials: (special: TQuestionSpecials) => void;
  setMaterial: (material: IThemeWithQuestions[]) => void;
}

export const questionSlice: StateCreator<QuestionSlice> = (set) => ({
  currentQuestion: null,
  answeredQuestionsIds: [],
  specials: "default",
  material: [],

  setMaterial: (material) => set({ material: material }),

  setSpecials: (specials) => set({ specials: specials }),

  setAnsweredQuestionsIds: (answeredQuestions) =>
    set({ answeredQuestionsIds: answeredQuestions }),

  setCurrentQuestion: (question) => set({ currentQuestion: question }),
});
