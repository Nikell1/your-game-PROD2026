import { CatInputPlayer } from "@/features/cat-in-bag";
import { CatIcon } from "@/shared/ui";

export function CatsModal() {
  return (
    <>
      <div className=" flex flex-col gap-4 items-center">
        <CatIcon />
        <h1 className="text-6xl font-bold">Кот в мешке!</h1>
        <p className="text-3xl text-center">
          Введите имя игрока, которому хотите передать вопрос
        </p>
      </div>

      <CatInputPlayer />
    </>
  );
}
