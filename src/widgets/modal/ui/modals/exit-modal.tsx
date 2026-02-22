import { useExitGame } from "@/features/exit-game";
import { Button } from "@/shared/ui";

export function ExitModal() {
  const { exit, back } = useExitGame();

  return (
    <>
      <h2 className="text-2xl text-center">
        Вы действительно хотите прервать игру?
      </h2>
      <h3 className="text-xl text-center">Ваша игра не сохранится!</h3>
      <div className="flex gap-8">
        <Button className="text-xl" size="xl" onClick={back}>
          Назад
        </Button>
        <Button className="text-xl" size="xl" onClick={exit}>
          Выйти
        </Button>
      </div>
    </>
  );
}
