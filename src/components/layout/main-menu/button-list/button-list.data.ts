import {
  BookOpen,
  ChartBar,
  LucideIcon,
  Pencil,
  Settings,
  ShoppingBasket,
  UserRound,
} from "lucide-react";

interface IMainMenuButtonsData {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const mainMenuButtonsData: IMainMenuButtonsData[] = [
  {
    href: "/profiles",
    label: "Профили",
    icon: UserRound,
  },
  {
    href: "/shop",
    label: "Магазин",
    icon: ShoppingBasket,
  },
  {
    href: "/tutorial",
    label: "Обучение",
    icon: BookOpen,
  },
  {
    href: "/statistics",
    label: "Статистика",
    icon: ChartBar,
  },
  {
    href: "/settings",
    label: "Настройки",
    icon: Settings,
  },
  {
    href: "/editor",
    label: "Редактор",
    icon: Pencil,
  },
];
