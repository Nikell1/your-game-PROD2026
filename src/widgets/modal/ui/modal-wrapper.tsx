import { cn } from "@/shared/lib";
import { Frame } from "@/shared/ui";

interface Props {
  children: React.ReactNode;
  className?: string;
  canClose?: boolean;
  close?: () => void;
}

export function ModalWrapper({ children, className, close = () => {} }: Props) {
  return (
    <>
      <div
        onClick={close}
        className="absolute z-5 bg-black/50 w-screen h-screen"
      />

      <Frame
        isSolid
        className={cn(
          "absolute z-10 left-[50%] top-[50%] -translate-[50%] rounded-xl flex-col p-4",
          className,
        )}
      >
        {children}
      </Frame>
    </>
  );
}
