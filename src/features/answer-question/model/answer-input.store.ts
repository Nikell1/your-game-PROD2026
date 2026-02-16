import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AnswerInputState {
  inputValue: string;
  isCorrect: boolean | null;
}

interface AnswerInputActions {
  setIsCorrect: (n: boolean | null) => void;
  setInputValue: (value: string) => void;
}

const initialState: AnswerInputState = {
  inputValue: "",
  isCorrect: null,
};

interface IAnswerInputStore extends AnswerInputState, AnswerInputActions {}

export const useAnswerInputStore = create<IAnswerInputStore>()(
  persist(
    (set) => ({
      ...initialState,

      setIsCorrect: (n) => set({ isCorrect: n }),

      setInputValue: (value) => set({ inputValue: value }),
    }),
    {
      name: "answer-input-storage",
    },
  ),
);
