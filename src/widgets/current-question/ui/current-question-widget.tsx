"use client";

import { useGameStore } from "@/entities/game";
import { AnswerInput } from "@/features/answer-question";
import { useAnswerInputStore } from "@/features/answer-question";
import { Frame } from "@/shared/ui";

export function CurrentQuestionWidget({
  clear,
  resume,
}: {
  clear: () => void;
  resume: () => void;
}) {
  const {
    activePlayerId,
    currentQuestion,
    finalQuestion,
    status,
    showCorrectAnswer,
  } = useGameStore();
  const { isCorrect } = useAnswerInputStore();

  const question =
    status === "FINAL_ROUND" ? { ...finalQuestion, price: 0 } : currentQuestion;

  const shouldShowAnswerInput = activePlayerId || isCorrect !== null;

  const elementClass =
    "bg-primary/25 border py-3 px-6 rounded-lg text-2xl border-primary";

  return (
    <Frame className="max-h-120 w-200 rounded-lg gap-4 p-6 flex-col">
      <div className="flex justify-between">
        <span className={elementClass}>Тема: {question?.themeLabel}</span>

        <span className={elementClass}>
          {status === "FINAL_ROUND"
            ? "Финальный вопрос"
            : `Цена: ${question?.price}`}
        </span>
      </div>

      <div className="flex-1 gap-32 flex flex-col">
        <p className="text-3xl">{question?.label}</p>
        {showCorrectAnswer && (
          <p className="text-2xl text-center">
            Правильный ответ: {question?.correctAnswer}
          </p>
        )}
      </div>

      {shouldShowAnswerInput && <AnswerInput clear={clear} resume={resume} />}
    </Frame>
  );
}
