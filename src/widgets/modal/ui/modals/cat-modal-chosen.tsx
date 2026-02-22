import { QUESTIONS_COUNT } from "@/entities/game";
import { Button, CatIcon } from "@/shared/ui";

interface Props {
  name?: string;
  onLeftClick: () => void;
  onRightClick: () => void;
  bet: number;
}

export function CatModalChosen({
  name,
  onLeftClick,
  onRightClick,
  bet,
}: Props) {
  return (
    <>
      <div className=" flex flex-col gap-4 items-center">
        <CatIcon />
        <h1 className="text-6xl font-bold">Кот в мешке!</h1>
        <p className="text-3xl text-center">{name}, Делайте ставку</p>
      </div>

      <div className="flex gap-8">
        <Button onClick={onLeftClick} className="text-2xl p-6">
          {bet}
        </Button>
        <Button onClick={onRightClick} className="text-2xl p-6">
          {bet * QUESTIONS_COUNT}
        </Button>
      </div>
    </>
  );
}
