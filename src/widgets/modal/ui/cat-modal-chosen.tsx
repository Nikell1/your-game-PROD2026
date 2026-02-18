import { Button, CatIcon } from "@/shared/ui";

interface Props {
  name?: string;
  onLeftClick: () => void;
  onRightClick: () => void;
}

export function CatModalChosen({ name, onLeftClick, onRightClick }: Props) {
  return (
    <>
      <div className=" flex flex-col gap-4 items-center">
        <CatIcon />
        <h1 className="text-6xl font-bold">Кот в мешке!</h1>
        <p className="text-3xl text-center">{name}, Делайте ставку</p>
      </div>

      <div className="flex gap-8">
        <Button onClick={onLeftClick} className="text-2xl p-6">
          100
        </Button>
        <Button onClick={onRightClick} className="text-2xl p-6">
          500
        </Button>
      </div>
    </>
  );
}
