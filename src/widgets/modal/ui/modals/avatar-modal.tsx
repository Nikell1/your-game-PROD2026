import { PRESET_AVATARS } from "@/entities/player";
import { usePlayerAvatar } from "@/features/player-avatar";
import { FileInput } from "@/shared/ui";
import Image from "next/image";

export function AvatarModal() {
  const { setAvatar, setCustomAvatar, avatarError } = usePlayerAvatar();

  return (
    <div>
      <h1 className="text-3xl text-center mb-8">Выберите аватар</h1>
      <div className="flex flex-wrap gap-8 justify-center mb-8">
        {PRESET_AVATARS.map((image, index) => (
          <Image
            onClick={() => setAvatar(image)}
            className="transition-transform duration-150 hover:scale-110 cursor-pointer"
            src={image}
            alt="Аватар"
            key={index}
            width={150}
            height={150}
            priority
          />
        ))}
      </div>
      {avatarError && <p className="mb-1 text-destructive/70">{avatarError}</p>}
      <FileInput onChange={setCustomAvatar} />
    </div>
  );
}
