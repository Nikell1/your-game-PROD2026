"use client";

import { useGameStore } from "@/entities/game";
import { useModalStore } from "@/shared/model";
import { Button, Switch } from "@/shared/ui";
import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function Header({ title }: { title: string }) {
  const { isOnDev, setIsOnDev, status } = useGameStore();
  const { setModalState } = useModalStore();

  const handleDevModeChange = useCallback(() => {
    setIsOnDev();
  }, [setIsOnDev]);

  const router = useRouter();

  const handleExit = useCallback(() => {
    if (status === "CREATING" || status === "ENDING") {
      router.replace("/");
    } else {
      setModalState("exit_submit");
    }
  }, [status, router, setModalState]);

  return (
    <header className="w-full flex justify-between py-6 px-12 shrink-0 relative">
      <Button variant="ghost" onClick={handleExit}>
        <LogOut className="size-8" />
      </Button>

      <h1 className="text-3xl bg-accent py-3 px-8 rounded-full">{title}</h1>

      <div className="relative flex items-center">
        <div
          className=" flex gap-8 justify-center items-center absolute top-0 backdrop-blur-xs 
        -left-90 bg-accent/40 border border-foreground/10 p-4 rounded-2xl"
        >
          <Switch
            className="scale-150"
            checked={isOnDev}
            onCheckedChange={handleDevModeChange}
          />

          <span className="text-xl">Режим разработчика</span>
        </div>

        <Settings size={35} />
      </div>
    </header>
  );
}
