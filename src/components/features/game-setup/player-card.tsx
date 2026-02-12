import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export function PlayerCard() {
  return (
    <div
      className={cn(
        "bg-accent p-8 w-80 rounded-xl relative",
        "before:size-full before:bg-accent/50 before:absolute before:top-2 before:right-2 before:rounded-xl before:z-1",
      )}
    >
      <button>
        <Trash2 className="absolute right-4 z-2 top-4 text-foreground cursor-pointer" />
      </button>

      <div className="relative z-2">
        <div className="rounded-full size-20 mx-auto bg-white"></div>

        <h4 className="text-lg text-center my-4 font-medium">Игрок 1</h4>

        <Input placeholder="Введите имя игрока" />

        <div className="bg-sidebar/30 rounded-2xl p-4 mt-8">
          <p className="text-center font-medium text-lg mb-2">Клавиша</p>
          <p className="text-4xl font-bold text-center">[ A ]</p>
        </div>
      </div>
    </div>
  );
}
