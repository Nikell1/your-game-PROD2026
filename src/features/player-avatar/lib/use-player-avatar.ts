import { useSetupGameStore } from "@/app-pages/setup-game/model/setup-game-store";
import { useModalStore } from "@/shared/model";

export function usePlayerAvatar() {
  const { setModalState } = useModalStore();
  const {
    setClickAvatarId,
    setPlayerAvatar,
    clickAvatarId,
    avatarError,
    setAvatarError,
  } = useSetupGameStore();

  function clickAvatarModal(index: number) {
    setClickAvatarId(index);
    setModalState("add_avatar");
  }

  function setAvatar(image: string) {
    setPlayerAvatar(clickAvatarId, image);
    setModalState("closed");
  }

  async function setCustomAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    setAvatarError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError("Файл должен быть изображением");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatar(reader.result);
      } else {
        setAvatarError("Ошибка чтения файла");
      }
    };

    reader.onerror = () => {
      setAvatarError("Ошибка чтения файла");
    };

    reader.readAsDataURL(file);
  }

  return { clickAvatarModal, setAvatar, setCustomAvatar, avatarError };
}
