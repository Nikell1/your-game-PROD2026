import { useSoundStore } from "@/features/sounds";
import { useModalStore } from "@/shared/model";
import { Button, Slider } from "@/shared/ui";
import { useState } from "react";

export function SettingsModal() {
  const { setVolume, volume } = useSoundStore();
  const [currentVolume, setCurrentVolume] = useState([volume * 100]);
  const { setModalState } = useModalStore();

  function handleSubmit() {
    setVolume(currentVolume[0] / 100);
    setModalState("closed");
  }

  return (
    <>
      <h2 className="text-3xl">Настройки</h2>
      <div className="flex gap-6">
        <span className="text-xl">Звук</span>
        <Slider
          className="w-50"
          min={0}
          max={100}
          value={currentVolume}
          onValueChange={setCurrentVolume}
        />
      </div>
      <Button size="xl" className="text-xl" onClick={handleSubmit}>
        Подтвердить
      </Button>
    </>
  );
}
