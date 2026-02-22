import { useHostStore } from "../model/host-store";
import { getRandomPhrase, GetRandomPhraseOptions } from "./get-random-phrase";

export function useHostPhrases() {
  const { setCurrentPhrase, currentEvent, currentPhrase } = useHostStore();

  function say({
    eventType,
    playerName,
    excludeLastId,
    price,
    bet,
  }: GetRandomPhraseOptions) {
    const phrase = getRandomPhrase({
      eventType,
      playerName,
      excludeLastId,
      price,
      bet,
    });
    setCurrentPhrase(phrase?.label || "");
  }

  return { say, currentEvent, currentPhrase };
}
