"use client";

import { QUESTIONS_COUNT, useGameStore } from "@/entities/game";
import { Button, Frame } from "@/shared/ui";

export function QuestionsTable() {
  const { themes } = useGameStore();

  const prices = Array.from(
    { length: QUESTIONS_COUNT },
    (_, i) => 100 * (i + 1),
  );

  return (
    <Frame className="rounded-xl max-h-120 gap-6 px-8! py-6!">
      {themes.map((theme) => (
        <div key={theme.id} className="flex gap-6">
          <Frame className="w-70 p-2! text-xl rounded-lg">{theme.label}</Frame>
          {prices.map((price) => (
            <Button
              key={`${theme.id} - ${price}`}
              className="text-2xl w-18 h-full rounded-xl"
            >
              {price}
            </Button>
          ))}
        </div>
      ))}
    </Frame>
  );
}
