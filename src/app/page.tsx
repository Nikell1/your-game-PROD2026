import { HexagonBackground } from "@/components/backgrounds";
import { ButtonList } from "@/components/layout/main-menu/button-list";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";
import { GAME_ROUTES } from "@/config/pages-url.config";
import { PROJECT_NAME } from "@/constants/seo.constants";
import { Play, Swords } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <HexagonBackground className="w-screen h-screen absolute top-0 right-0 z-1" />

      <div className="relative z-2 w-screen h-full">
        <header className="flex items-center w-screen flex-col mt-20 ">
          <Swords size={60} />

          <div className="relative">
            <h1 className="text-4xl font-bold">{PROJECT_NAME.toUpperCase()}</h1>
            <Badge className="absolute -right-6 -top-2 rotate-25">Alpha</Badge>
          </div>

          <p className="mt-2 text-lg">Интеллектуальная викторина</p>
        </header>

        <main>
          <Link href={GAME_ROUTES.PREPARE}>
            <Button className="flex mx-auto scale-150 mt-20 mb-30 cursor-pointer">
              <Play fill="white" />
              <span>Создать игру</span>
            </Button>
          </Link>
          <ButtonList />
        </main>

        <footer className="text-center mt-40">Version: 0.0.1</footer>
      </div>
    </>
  );
}
