"use client";

import { useGameStore, getRoundTitle } from "@/entities/game";
import { Header, HostWidget, QuestionsTable, PlayersList } from "@/widgets";
import { ModalWidget } from "@/widgets/modal";

export function GameRoundPage() {
  const { status } = useGameStore();

  const headerTitle = getRoundTitle(status);

  return (
    <>
      <Header title={headerTitle} />

      <div className="flex w-full p-8 flex-1">
        <HostWidget />
        <div className="flex-1 flex justify-center">
          <QuestionsTable />
        </div>
      </div>

      <PlayersList />
      <ModalWidget />
    </>
  );
}
