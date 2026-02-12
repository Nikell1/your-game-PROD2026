import { PlayerCard } from "@/components/features/game-setup";
import { HeaderTitle } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { NO_INDEX_PAGE, PROJECT_NAME } from "@/constants/seo.constants";
import { Play, Plus } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Подготовка`,
  ...NO_INDEX_PAGE,
};

export default function CreateGame() {
  return (
    <>
      <HeaderTitle title="Этап подготовки" />

      <div className="flex flex-col">
        <div className="flex flex-wrap gap-12 my-16 justify-center">
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
        </div>

        <div className="flex gap-12 w-140 mx-auto">
          <Button variant="secondary" size="xl" className="flex-2 text-md">
            <Plus />
            <span>Добавить игрока</span>
          </Button>

          <Button className="flex-2 text-md" size="xl">
            <Play fill="white" />
            <span>Начать</span>
          </Button>
        </div>
      </div>
    </>
  );
}
