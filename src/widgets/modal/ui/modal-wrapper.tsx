import { cn } from "@/shared/lib";
import { Frame } from "@/shared/ui";

export function ModalWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className="absolute z-5 bg-black/50 w-screen h-screen" />

      <Frame
        isSolid
        className={cn(
          "absolute z-10 left-[50%] top-[43%] -translate-[50%] rounded-xl",
          className,
        )}
      >
        {children}
      </Frame>
    </>
  );
}
