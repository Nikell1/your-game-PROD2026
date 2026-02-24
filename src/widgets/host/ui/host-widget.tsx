"use client";

import { useGameStore } from "@/entities/game";
import { HostPhrase } from "@/entities/host";
import { Frame } from "@/shared/ui";
import Image from "next/image";

export function HostWidget({ seconds }: { seconds?: number }) {
  const { currentQuestion, isShowTimer, finalQuestion, activePlayerId } =
    useGameStore();

  const showTimer =
    (currentQuestion?.isAnswering || (finalQuestion && activePlayerId)) &&
    isShowTimer;

  return (
    <div className="flex flex-col h-full justify-between items-center relative z-3 shrink-0">
      <div>
        <HostPhrase />
        {showTimer && (
          <Frame className="rounded-md mt-4 w-full absolute justify-between p-4">
            <span>Оставшееся время:</span>
            <span>{seconds}</span>
          </Frame>
        )}
      </div>

      <Image
        className="relative bottom-2"
        src="/host-image.png"
        width={245}
        height={448}
        alt="Ведущий"
        loading="eager"
      />
    </div>
  );
}
