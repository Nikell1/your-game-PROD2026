import { Button } from "@/components/ui";
import Link from "next/link";
import { mainMenuButtonsData } from "./button-list.data";

export function ButtonList() {
  return (
    <div className="flex flex-wrap gap-x-12 gap-y-10 justify-center max-w-200 mx-auto">
      {mainMenuButtonsData.map((item) => (
        <Button key={item.href} size="xl" className="text-lg w-40">
          <item.icon />
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </div>
  );
}
