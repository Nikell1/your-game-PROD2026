import { Button, Input } from "@/shared/ui";
import { Send } from "lucide-react";
import { useCatModal } from "../lib/use-cat-modal";
import { useEffect, useRef } from "react";
import { createEnterListener } from "@/shared/lib";

export function CatInputPlayer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputValue, setAndValidateInputValue, submitPlayer, isBtnDisabled } =
    useCatModal();

  useEffect(() => {
    inputRef.current?.focus();
    if (!isBtnDisabled) {
      const cleanup = createEnterListener(() => submitPlayer(inputValue));
      return cleanup;
    }
  }, [submitPlayer, isBtnDisabled, inputValue]);

  return (
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
  );
}
