"use client";

import { PlayerSetupCard } from "@/entities/player";
import { Button } from "@/shared/ui";
import { Header } from "@/widgets";
import { useSetupGameStore } from "../model/setup-game-store";
import { cn } from "@/shared/lib";
import { ModalWidget } from "@/widgets/modal";
import { usePlayerAvatar } from "@/features/player-avatar";
import { useSetupPage } from "../lib/use-setup-page";

export function SetupGamePage() {
  const { playersData, updatePlayerName, resetSetupGameStore } =
    useSetupGameStore();

  const {
    deletingPlayerIndex,
    newPlayerIndex,
    handleRemovePlayer,
    handleAddPlayer,
    isPlayersValid,
    startGame,
    isAddBtnDisabled,
    isRemoveBtnDisabled,
  } = useSetupPage();

  const { clickAvatarModal } = usePlayerAvatar();

  return (
    <>
      <div className="flex flex-col items-center relative z-0">
        <Header title="Подготовка к игре" />

        <div className="flex flex-wrap gap-14 px-8 py-4 max-w-278">
          {playersData.map((player, index) => (
            <PlayerSetupCard
              isDeleting={index === deletingPlayerIndex}
              key={index}
              isNew={index === newPlayerIndex}
              player={player}
              index={index}
              onNameChange={updatePlayerName}
              onPlayerRemove={handleRemovePlayer}
              isDisabled={isRemoveBtnDisabled}
              onClick={() => clickAvatarModal(index)}
            />
          ))}

          {isAddBtnDisabled && (
            <Button
              className={cn("border text-8xl size-25 relative mx-13 my-18")}
              onClick={handleAddPlayer}
            >
              <span className="absolute -top-2 left-4">+</span>
            </Button>
          )}
        </div>
        <div className="mt-6 flex flex-col items-center">
          {!isPlayersValid && (
            <p className="text-foreground/25 absolute">
              Имена не могут быть пустыми и не должны повторяться
            </p>
          )}
          <Button
            size="xl"
            className="text-2xl px-20 py-6 mt-8"
            disabled={!isPlayersValid}
            onClick={() => startGame({ playersData, resetSetupGameStore })}
          >
            Начать игру
          </Button>
        </div>
      </div>

      <ModalWidget />
    </>
  );
}
