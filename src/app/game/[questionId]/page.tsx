import { QuestionPage } from "@/app-pages";
import { IQuestion } from "@/entities/game";
import { NO_INDEX_PAGE, PROJECT_NAME } from "@/shared/constants";
import { Metadata } from "next";
import questionsData from "../../../../public/data/questions.json";

export async function generateStaticParams() {
  const questions = questionsData as IQuestion[];

  return questions.map((question) => ({
    questionId: question.id.toString(),
  }));
}

export const dynamicParams = false;

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Вопрос`,
  ...NO_INDEX_PAGE,
};

export default function Question() {
  return <QuestionPage />;
}
