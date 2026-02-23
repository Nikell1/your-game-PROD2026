import { useCallback } from "react";
import { SOUNDS_PATHS } from "../sound-constants";
import { TSound } from "../sounds-types";
import { useAudioPlayer, useAudioPlayerContext } from "react-use-audio-player";
import { useSoundStore } from "../model/sound-store";

export function useSound() {
  const { load: loadLooping, stop } = useAudioPlayerContext();
  const { load } = useAudioPlayer();
  const { volume } = useSoundStore();

  const playLoopSound = useCallback(
    (soundType: TSound) => {
      loadLooping(SOUNDS_PATHS[soundType], {
        initialVolume: volume,
        autoplay: true,
        loop: true,
      });
    },
    [loadLooping, volume],
  );

  const stopLoopSound = useCallback(() => {
    stop();
  }, [stop]);

  const playSound = useCallback(
    (soundType: TSound) => {
      load(SOUNDS_PATHS[soundType], {
        initialVolume: volume,
        autoplay: true,
        loop: false,
      });
    },
    [load, volume],
  );

  return { playLoopSound, playSound, stopLoopSound };
}
