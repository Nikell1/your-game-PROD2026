import { useGameStore } from "@/entities/game";
import { useHostPhrases } from "@/entities/host";
import { useModalStore } from "@/shared/model";
import { useState } from "react";

export function useCatModal() {
  const {
    setModalState,
    inputValue,
    setInputValue,
    resetModalStore,
    setIsCatPlayer,
  } = useModalStore();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const { say } = useHostPhrases();
  const {
    players,
    setActivePlayerId,
    setPrevActivePlayerId,
    prevActivePlayerId,
    setSpecials,
  } = useGameStore();

  function showCatModal() {
    resetModalStore();
    setModalState("cat_in_bag");
  }

  function submitPlayer(value: string) {
    const chosenPlayer = players.find(
      (player) => player.name.toLowerCase() === value.toLowerCase(),
    );

    setActivePlayerId(chosenPlayer?.id || -1);
    setPrevActivePlayerId(chosenPlayer?.id || -1);
    setIsCatPlayer(true);
    setSpecials("cat_in_bag");
    say({
      eventType: "cat_in_bag_player_selected",
      playerName: chosenPlayer?.name,
    });
  }

  function setAndValidateInputValue(value: string) {
    setInputValue(value);
    const chosenPlayer = players.find(
      (player) => player.name.toLowerCase() === value.toLowerCase(),
    );
    if (chosenPlayer) {
      if (chosenPlayer.id !== prevActivePlayerId) {
        setIsBtnDisabled(false);
      } else {
        setIsBtnDisabled(true);
      }
    } else {
      setIsBtnDisabled(true);
    }
  }

  return {
    showCatModal,
    submitPlayer,
    inputValue,
    setAndValidateInputValue,
    isBtnDisabled,
  };
}
