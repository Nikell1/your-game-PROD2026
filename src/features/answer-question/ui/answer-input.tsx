"use client";

import { Button, Input } from "@/shared/ui";
import { Send } from "lucide-react";
import { useAnswerQuestion } from "../lib/use-answer-question";
import { useEffect, useRef } from "react";
import { cn, createEnterListener } from "@/shared/lib";
import { useAnswerInputStore } from "../model/answer-input-store";
import { useGameStore } from "@/entities/game";

export function AnswerInput({
  clear,
  resume,
}: {
  clear: () => void;
  resume: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { answerHandler, currentQuestion, isOnDev, activePlayerId } =
    useAnswerQuestion(clear, resume);
  const { isTimerActive } = useGameStore();
  const { isCorrect, inputValue, setInputValue } = useAnswerInputStore();

  useEffect(() => {
    if (activePlayerId) {
      const cleanup = createEnterListener(() => answerHandler(inputValue));
      if (!isTimerActive) {
        inputRef.current?.focus();
      }

      return cleanup;
    }
  }, [activePlayerId, answerHandler, inputValue, isTimerActive]);

  return (
    <div className="relative">
      {isOnDev && (
        <p className="mb-3 text-foreground/50">
          Правильный ответ: {currentQuestion?.correctAnswer}
        </p>
      )}
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
        className="absolute right-0 bottom-0"
      >
        <Send size={30} />
      </Button>
    </div>
  );
}
