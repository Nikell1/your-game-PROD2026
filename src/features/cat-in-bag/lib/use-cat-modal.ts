import { useGameStore } from "@/entities/game";
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
  const { players, setActivePlayerId, setPrevActivePlayerId } = useGameStore();

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
  }

  function setAndValidateInputValue(value: string) {
    setInputValue(value);

    if (
      players.find(
        (player) => player.name.toLowerCase() === value.toLowerCase(),
      )
    ) {
      setIsBtnDisabled(false);
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
