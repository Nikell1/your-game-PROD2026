"use client";

import { getRoundTitle, useGameStore } from "@/entities/game";
import { Header, HostWidget, PlayersList } from "@/widgets";
import { FinalTable } from "@/widgets/final";
import { ModalWidget } from "@/widgets/modal";

export function FinalRoundPage() {
  const { status } = useGameStore();
  const headerTitle = getRoundTitle(status);

  return (
    <>
      <Header title={headerTitle} />

      <div className="flex w-full p-8 flex-1">
        <HostWidget />
        <div className="flex-1 flex justify-center">
          <FinalTable />
        </div>
      </div>

      <PlayersList />
      <ModalWidget />
    </>
  );
}
