import { useGameStore } from "@/entities/game";
import { Frame } from "@/shared/ui";
import Image from "next/image";

export function HostWidget({ seconds }: { seconds?: number }) {
  const { currentQuestion } = useGameStore();

  return (
    <div className="flex flex-col h-full justify-between items-center relative z-3 shrink-0">
      <div>
        <Frame className="rounded-lg size-60">
          <p className="text-xl">Олег, выбирайте вопрос</p>
        </Frame>

        {currentQuestion && (
          <Frame className="rounded-md mt-6 flex-row! justify-between">
            <span>Оставшееся время:</span>
            <span>{seconds}</span>
          </Frame>
        )}
      </div>

      <Image
        className="relative -bottom-5"
        src="/host-image.png"
        width={193}
        height={483}
        alt="Ведущий"
        loading="eager"
      />
    </div>
  );
}
