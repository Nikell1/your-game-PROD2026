"use client";

import { useGameStore } from "@/entities/game";
import { AnswerInput } from "@/features/answer-question";
import { useAnswerInputStore } from "@/features/answer-question";
import { Frame } from "@/shared/ui";

export function CurrentQuestionWidget() {
  const { activePlayerId, currentQuestion } = useGameStore();
  const { isCorrect } = useAnswerInputStore();

  const shouldShowAnswerInput = activePlayerId || isCorrect !== null;

  const elementClass =
    "bg-primary/25 border py-3 px-6 rounded-lg text-2xl border-primary";

  return (
    <Frame className="max-h-120 w-200 rounded-lg gap-4 p-6!">
      <div className="flex justify-between">
        <span className={elementClass}>
          Тема: {currentQuestion?.themeLabel}
        </span>

        <span className={elementClass}>Цена: {currentQuestion?.price}</span>
      </div>

      <p className="text-3xl flex-1">{currentQuestion?.label}</p>

      {shouldShowAnswerInput && <AnswerInput />}
    </Frame>
  );
}
