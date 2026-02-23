import { Button, Input } from "@/shared/ui";
import { Send } from "lucide-react";
import { useCatModal } from "../lib/use-cat-modal";
import { useEffect, useRef } from "react";
import { createEnterListener } from "@/shared/lib";
import { useGameStore } from "@/entities/game";
import { useFindPlayerInPlayers } from "@/entities/player";

export function CatInputPlayer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputValue, setAndValidateInputValue, submitPlayer, isBtnDisabled } =
    useCatModal();
  const { prevActivePlayerId } = useGameStore();

  useEffect(() => {
    inputRef.current?.focus();
    if (!isBtnDisabled) {
      const cleanup = createEnterListener(() => submitPlayer(inputValue));
      return cleanup;
    }
  }, [submitPlayer, isBtnDisabled, inputValue]);

  const findPlayer = useFindPlayerInPlayers();

  const isChooseSelf =
    findPlayer(prevActivePlayerId || -1)?.name === inputValue;

  return (
    <div className="relative w-full mt-4">
      {isChooseSelf && (
        <p className="absolute -top-8 left-2 text-foreground/40">
          Вы не можете передать кота себе же
        </p>
      )}
      <div className="relative w-full">
        <Input
          ref={inputRef}
          className="text-xl! bg-primary/25 border rounded-lg border-primary"
          value={inputValue}
          onChange={(e) => setAndValidateInputValue(e.target.value)}
        />

        <Button
          variant="ghost"
          className="absolute right-0 bottom-0"
          onClick={() => submitPlayer(inputValue)}
          disabled={isBtnDisabled}
        >
          <Send size={30} />
        </Button>
      </div>
    </div>
  );
}
