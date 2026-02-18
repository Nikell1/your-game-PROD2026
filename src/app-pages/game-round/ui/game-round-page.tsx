"use client";

import { useGameStore, getRoundTitle } from "@/entities/game";
import { Header, HostWidget, QuestionsTable, PlayersList } from "@/widgets";
import { AuctionWidget } from "@/widgets/auction/ui/auction-widget";
import { ModalWidget } from "@/widgets/modal";

export function GameRoundPage() {
  const { status, specials } = useGameStore();

  const headerTitle = getRoundTitle(status);

  return (
    <>
      <Header title={headerTitle} />

      <div className="flex w-full p-8 flex-1">
        <HostWidget />
        <div className="flex-1 flex justify-center">
          {specials === "cat_in_bag" && <></>}
          {specials === "auction" && <AuctionWidget />}
          {specials === "default" && <QuestionsTable />}
        </div>
      </div>

      <PlayersList />
      <ModalWidget />
    </>
  );
}
