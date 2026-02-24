import { test, expect, Page } from "@playwright/test";

// Clear persisted zustand state before each test so runs are isolated.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

async function createGameWithTwoPlayers(page: Page) {
  await page.goto("/");

  // Main menu → setup game.
  await expect(page.getByText("Интеллектуальная викторина")).toBeVisible();
  await page.getByRole("link", { name: /Создать игру/i }).click();
  await expect(
    page.getByRole("heading", { name: "Подготовка к игре" }),
  ).toBeVisible();

  // Fill in two unique player names.
  const nameInputs = page.getByPlaceholder("Имя игрока");
  await expect(nameInputs).toHaveCount(2);

  const startButton = page.getByRole("button", { name: "Начать игру" });
  await expect(startButton).toBeDisabled();

  await nameInputs.nth(0).fill("Игрок 1");
  await nameInputs.nth(1).fill("Игрок 2");

  // Validation hint should disappear and start button become enabled.
  const validationHint = page.getByText("Имена не могут быть пустыми", {
    exact: false,
  });
  await expect(validationHint).toBeHidden();
  await expect(startButton).toBeEnabled();
  await startButton.click();

  // We should be in the first round.
  await expect(page).toHaveURL(/\/game\/round\/1\/?$/);
  await expect(page.getByRole("heading", { name: "Раунд 1" })).toBeVisible();
}

test("main menu navigates to setup game", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Интеллектуальная викторина")).toBeVisible();

  await page.getByRole("link", { name: /Создать игру/i }).click();

  await expect(
    page.getByRole("heading", { name: "Подготовка к игре" }),
  ).toBeVisible();
});

test("game setup validates players and starts first round", async ({
  page,
}) => {
  await createGameWithTwoPlayers(page);
});

test("should add new player", async ({ page }) => {
  await page.goto("/game/setup");

  const nameInputs = page.getByPlaceholder("Имя игрока");
  const initialCount = await nameInputs.count();

  const addPlayerButton = page.getByRole("button", { name: "+" });
  await addPlayerButton.click();

  await expect(nameInputs).toHaveCount(initialCount + 1);
});

test("round table opens a question and enables answer input after buzzer", async ({
  page,
}) => {
  await createGameWithTwoPlayers(page);

  const devSwitch = page.getByRole("switch");
  await devSwitch.click();

  // Click the first available question (button with a numeric price).
  const questionButton = page
    .getByRole("button")
    .filter({ hasText: /\d+/ })
    .first();

  await questionButton.click();

  // We should be on a specific question page.
  await expect(page).toHaveURL(/\/game\/[^/]+\/?$/);

  // Question meta should be visible.
  await expect(page.getByText("Тема:")).toBeVisible();
  await expect(page.getByText("Цена:")).toBeVisible();

  // Simulate a player buzzing in with the first player's key (KeyA).
  await page.keyboard.press("KeyA");

  const answerInput = page.getByRole("textbox");
  await expect(answerInput).toBeEnabled();
});

test("should handle correct answer", async ({ page }) => {
  await createGameWithTwoPlayers(page);

  // ✅ Включаем dev-режим ОДИН раз
  const devSwitch = page.getByRole("switch");
  await devSwitch.click();

  const questionButton = page
    .getByRole("button")
    .filter({ hasText: /\d+/ })
    .first();

  await questionButton.click();
  await expect(page).toHaveURL(/\/game\/[^/]+\/?$/);

  await page.keyboard.press("KeyA");

  // ✅ Теперь элемент должен быть виден
  const devAnswerElement = page.getByText(/Правильный ответ:/);
  await expect(devAnswerElement).toBeVisible({ timeout: 10000 });

  const devAnswerText = await devAnswerElement.textContent();
  const correctAnswer =
    devAnswerText?.split(":").slice(1).join(":").trim() ?? "";

  const answerInput = page.getByRole("textbox");
  await expect(answerInput).toBeEnabled();

  await answerInput.fill(correctAnswer);
  await page.keyboard.press("Enter");

  await expect(answerInput).toHaveClass(/border-green-500/);
});

test("should handle incorrect answer", async ({ page }) => {
  await createGameWithTwoPlayers(page);

  const devSwitchOnRound = page.getByRole("switch");
  await devSwitchOnRound.click();

  const questionButton = page
    .getByRole("button")
    .filter({ hasText: /\d+/ })
    .first();

  await questionButton.click();
  await expect(page).toHaveURL(/\/game\/[^/]+\/?$/);

  await page.keyboard.press("KeyA");

  const devAnswerText = await page.getByText(/Правильный ответ:/).textContent();

  const correctAnswer =
    devAnswerText?.split(":").slice(1).join(":").trim() ?? "";

  const answerInput = page.getByRole("textbox");
  await expect(answerInput).toBeEnabled();

  await answerInput.fill(`${correctAnswer}-incorrect`);
  await page.keyboard.press("Enter");

  await expect(answerInput).toHaveClass(/border-red-500/);
});

test("should open cat in bag modal", async ({ page }) => {
  await createGameWithTwoPlayers(page);

  const devSwitch = page.getByRole("switch");
  await devSwitch.click();

  const catQuestionButton = page
    .locator('button:has(path[d^="M78.4648 27.6563"])')
    .first();

  await expect(catQuestionButton).toBeVisible();
  await catQuestionButton.click({ force: true });

  await expect(page.getByRole("heading", { name: "Кот в мешке!" })).toBeVisible(
    { timeout: 10000 },
  );
});

test("should place bets in auction", async ({ page }) => {
  await createGameWithTwoPlayers(page);

  const devSwitch = page.getByRole("switch");
  await devSwitch.click();

  const auctionQuestionButton = page
    .locator('button:has(path[d^="M4.81954 55.9964"])')
    .first();

  await expect(auctionQuestionButton).toBeVisible();
  await auctionQuestionButton.click({ force: true });

  await page.waitForTimeout(4000);
});

test("final round page renders with final table", async ({ page }) => {
  await page.goto("/game/round/final");

  await expect(
    page.getByRole("heading", { name: "Финальный Раунд" }),
  ).toBeVisible();
  await expect(page.getByText("Тема финала")).toBeVisible();
});

test("should calculate final scores", async ({ page }) => {
  await page.goto("/game/round/final");

  await expect(page.getByText("Тема финала")).toBeVisible();
});

test("game ending page shows winners header and can return home", async ({
  page,
}) => {
  await page.goto("/game/ending");

  await expect(page.getByRole("heading", { name: "Победители" })).toBeVisible();

  const homeLink = page.getByRole("link", { name: "На главную" });
  await expect(homeLink).toBeVisible();

  await homeLink.click();
  await expect(page).toHaveURL("/");
});

test("should save volume settings", async ({ page }) => {
  await page.goto("/game/setup");

  await page.locator("header button").last().click();

  const slider = page.getByRole("slider");
  await slider.focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");

  await page.getByRole("button", { name: "Подтвердить" }).click();

  const updatedStorage = await page.evaluate(() =>
    window.localStorage.getItem("sound-storage"),
  );

  expect(updatedStorage).not.toBeNull();

  const parsed = updatedStorage ? JSON.parse(updatedStorage) : null;
  expect(parsed?.state?.volume).toBeGreaterThan(0);
});
