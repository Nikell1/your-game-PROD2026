import { create } from "zustand";
import { persist } from "zustand/middleware";

type TModalState =
  | "closed"
  | "cat_in_bag"
  | "auction"
  | "exit_submit"
  | "round_results"
  | "final_bet";

interface ModalState {
  modalState: TModalState;
  inputValue: string;
  isCatPlayer: boolean;
}

interface ModalActions {
  setModalState: (state: TModalState) => void;
  setInputValue: (value: string) => void;
  resetModalStore: () => void;
  setIsCatPlayer: (is: boolean) => void;
}

interface ModalStoreState extends ModalState, ModalActions {}

const initialState: ModalState = {
  modalState: "closed",
  inputValue: "",
  isCatPlayer: false,
};

export const useModalStore = create<ModalStoreState>()(
  persist(
    (set) => ({
      ...initialState,

      setIsCatPlayer: (is) => set({ isCatPlayer: is }),

      setModalState: (state) => set({ modalState: state }),

      setInputValue: (value) => set({ inputValue: value }),

      resetModalStore: () => set({ ...initialState }),
    }),
    { name: "modal-storage" },
  ),
);
