import { useModalStore } from "@/shared/model";
import { CatsModal } from "./cat-modal";
import { ModalWrapper } from "./modal-wrapper";

export function ModalWidget() {
  const { modalState } = useModalStore();

  if (modalState === "cat_in_bag") {
    return (
      <ModalWrapper className="w-170 pt-10! pb-6! gap-12 items-center">
        <CatsModal />
      </ModalWrapper>
    );
  }
}
