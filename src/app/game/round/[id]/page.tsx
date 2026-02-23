import { GameRoundPage } from "@/app-pages";
import { NO_INDEX_PAGE, PROJECT_NAME } from "@/shared/constants";
import { Metadata } from "next";

export async function generateStaticParams() {
  const roundIds = ["1", "2"];

  return roundIds.map((id) => ({
    id: id,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `${PROJECT_NAME} | Раунд ${id}`,
    ...NO_INDEX_PAGE,
  };
}

export default function Round() {
  return <GameRoundPage />;
}
