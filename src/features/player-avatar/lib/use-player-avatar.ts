import { useSetupGameStore } from "@/app-pages/setup-game/model/setup-game-store";
import { compressImage } from "@/shared/lib/compress-image";
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

    const base64 = await new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Ошибка чтения файла"));
        }
      };
      reader.onerror = () => reject(new Error("Ошибка чтения файла"));
      reader.readAsDataURL(file);
    });

    try {
      const compressed = await compressImage(base64, 150, 0.6);
      setAvatar(compressed);
    } catch {
      setAvatarError("Ошибка сжатия изображения");
    }
  }

  return { clickAvatarModal, setAvatar, setCustomAvatar, avatarError };
}
