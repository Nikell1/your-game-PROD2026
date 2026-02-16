"use client";

import { useGameStore } from "@/entities/game";
import { useQuestionClick } from "@/features/question-click";
import { Button, CatIcon, Frame } from "@/shared/ui";

export function QuestionsTable() {
  const { material, answeredQuestionsIds, isOnDev } = useGameStore();
  const questionClick = useQuestionClick();

  return (
    <Frame className="rounded-xl max-h-120 gap-6 px-8! py-6!">
      {material.map((material) => (
        <div key={material.theme.id} className="flex gap-6">
          <Frame className="w-70 p-2! text-xl rounded-lg">
            {material.theme.label}
          </Frame>

          {material.questions.map((question) => {
            if (!answeredQuestionsIds.includes(question.id)) {
              const isCat = question.specials === "cat_in_bag";
              const showCats = isCat && isOnDev;

              return (
                <Button
                  key={question.id}
                  className="text-2xl w-18 h-full rounded-xl"
                  onClick={() => questionClick(question)}
                >
                  {showCats ? <CatIcon className="size-7" /> : question.price}
                </Button>
              );
            } else {
              return (
                <Button
                  className="w-18 h-full rounded-xl"
                  disabled
                  key={question.id}
                />
              );
            }
          })}
        </div>
      ))}
    </Frame>
  );
}
