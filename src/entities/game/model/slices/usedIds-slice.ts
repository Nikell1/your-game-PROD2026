import { StateCreator } from "zustand";

export interface UsedIdsSlice {
  usedQuestionsIds: string[];
  usedThemesIds: string[];

  setUsedQuestionsIds: (newQuestions: string[]) => void;
  setUsedThemesIds: (newThemes: string[]) => void;
}

export const usedIdsSlice: StateCreator<UsedIdsSlice> = (set) => ({
  usedQuestionsIds: [],
  usedThemesIds: [],

  setUsedThemesIds: (newThemes) =>
    set((state) => ({
      usedThemesIds: [...state.usedThemesIds, ...newThemes],
    })),

  setUsedQuestionsIds: (newQuestions) =>
    set((state) => ({
      usedQuestionsIds: [...state.usedQuestionsIds, ...newQuestions],
    })),
});
