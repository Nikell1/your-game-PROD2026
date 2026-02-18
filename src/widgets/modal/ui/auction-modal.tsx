import { AuctionIcon } from "@/shared/ui";

export function AuctionModal() {
  return (
    <div className=" flex flex-col gap-6 pb-4 items-center">
      <AuctionIcon />
      <h1 className="text-6xl font-bold">Аукцион!</h1>
      <p className="text-3xl text-center">Время делать ставки!</p>
    </div>
  );
}
