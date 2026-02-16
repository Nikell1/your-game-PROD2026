"use client";

import { useGameStore } from "@/entities/game";
import { Switch } from "@/shared/ui";
import { LogOut, Settings } from "lucide-react";

export function Header({ title }: { title: string }) {
  const { isOnDev, setIsOnDev } = useGameStore();

  return (
    <header className="w-full flex justify-between py-6 px-12 shrink-0 relative">
      <LogOut size={35} />

      <h1 className="text-3xl bg-accent py-3 px-8 rounded-full">{title}</h1>

      <div className="relative flex items-center">
        <div
          className=" flex gap-8 justify-center items-center absolute top-0 backdrop-blur-xs 
        -left-90 bg-accent/40 border border-foreground/10 p-4 rounded-2xl"
        >
          <Switch
            className="scale-150"
            checked={isOnDev}
            onCheckedChange={() => setIsOnDev()}
          />

          <span className="text-xl">Режим разработчика</span>
        </div>

        <Settings size={35} />
      </div>
    </header>
  );
}
