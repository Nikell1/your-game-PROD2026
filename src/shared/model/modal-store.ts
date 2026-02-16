import { create } from "zustand";
import { persist } from "zustand/middleware";

type TModalState = "closed" | "cat_in_bag" | "auction" | "exit_submit";

interface ModalState {
  modalState: TModalState;
  inputValue: string;
}

interface ModalActions {
  setModalState: (state: TModalState) => void;
  setInputValue: (value: string) => void;
}

interface ModalStoreState extends ModalState, ModalActions {}

const initialState: ModalState = {
  modalState: "closed",
  inputValue: "",
};

export const useModalStore = create<ModalStoreState>()(
  persist(
    (set) => ({
      ...initialState,

      setModalState: (state) => set({ modalState: state }),

      setInputValue: (value) => set({ inputValue: value }),
    }),
    { name: "modal-storage" },
  ),
);
