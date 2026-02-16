"use client";

import { Button, Input } from "@/shared/ui";
import { Send } from "lucide-react";
import { useAnswerQuestion } from "../lib/use-answer-question";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/shared/lib";
import { useAnswerInputStore } from "../model/answer-input.store";

export function AnswerInput({
  activePlayerId,
}: {
  activePlayerId: number | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { answerHandler } = useAnswerQuestion();
  const { isCorrect, inputValue, setInputValue } = useAnswerInputStore();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        answerHandler(inputValue);
      }
    },
    [answerHandler, inputValue],
  );

  useEffect(() => {
    if (activePlayerId) {
      window.addEventListener("keydown", handleKeyDown);
      inputRef.current?.focus();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, activePlayerId]);

  return (
    <div className="relative">
      <Input
        disabled={!activePlayerId}
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className={cn(
          "text-xl! bg-primary/25 border rounded-lg border-primary",
          isCorrect === true && "border-green-500",
          isCorrect === false && "border-red-500",
        )}
      />
      <Button
        disabled={!activePlayerId}
        onClick={() => answerHandler(inputValue)}
        variant="ghost"
        className="absolute right-0 top-0"
      >
        <Send size={30} />
      </Button>
    </div>
  );
}
