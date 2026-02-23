//этот огроманый костыль для деплоя мне написала нейронка, потому что я вообще не понял, как его запустить для next js

const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(process.cwd(), "out");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const ORIGINAL_PUBLIC_DIR = path.join(process.cwd(), "public_original");

console.log("🚀 Подготовка статических файлов...");
console.log(`📁 Текущая директория: ${process.cwd()}`);

try {
  // Удаляем существующую public
  if (fs.existsSync(PUBLIC_DIR)) {
    console.log("📁 Удаление существующей public папки...");
    fs.rmSync(PUBLIC_DIR, { recursive: true, force: true });
  }

  // Создаем новую public
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  console.log("✅ Создана новая public папка");

  // Копируем из out (результат сборки Next.js)
  if (fs.existsSync(OUT_DIR)) {
    console.log("📋 Копирование из out...");
    const items = fs.readdirSync(OUT_DIR);

    items.forEach((item) => {
      const src = path.join(OUT_DIR, item);
      const dest = path.join(PUBLIC_DIR, item);

      if (fs.lstatSync(src).isDirectory()) {
        fs.cpSync(src, dest, { recursive: true, force: true });
      } else {
        fs.copyFileSync(src, dest);
      }
    });

    console.log(`✅ Скопировано ${items.length} элементов из out`);

    // Проверяем наличие index.html
    if (fs.existsSync(path.join(PUBLIC_DIR, "index.html"))) {
      console.log("✅ index.html найден в корне public");
    } else {
      console.warn("⚠️ index.html НЕ найден в корне public!");
    }
  } else {
    console.log("ℹ️ Папка out не найдена (это нормально для prebuild)");
  }

  // Копируем из public_original (исходные статические файлы)
  if (fs.existsSync(ORIGINAL_PUBLIC_DIR)) {
    console.log("📋 Копирование из public_original...");
    const items = fs.readdirSync(ORIGINAL_PUBLIC_DIR);

    items.forEach((item) => {
      const src = path.join(ORIGINAL_PUBLIC_DIR, item);
      const dest = path.join(PUBLIC_DIR, item);

      if (fs.lstatSync(src).isDirectory()) {
        fs.cpSync(src, dest, { recursive: true, force: true });
      } else {
        fs.copyFileSync(src, dest);
      }
    });

    console.log(`✅ Скопировано ${items.length} элементов из public_original`);
  } else {
    console.log("ℹ️ Папка public_original не найдена");
  }

  // Итоговая проверка
  if (fs.existsSync(PUBLIC_DIR)) {
    const totalItems = fs.readdirSync(PUBLIC_DIR).length;
    console.log(`🎉 Готово! В папке public ${totalItems} элементов`);

    // Выводим первые 10 элементов для отладки
    console.log("📄 Содержимое public (первые 10):");
    fs.readdirSync(PUBLIC_DIR)
      .slice(0, 10)
      .forEach((item) => {
        const stats = fs.lstatSync(path.join(PUBLIC_DIR, item));
        console.log(
          `   - ${item} ${stats.isDirectory() ? "(папка)" : "(файл)"}`,
        );
      });
  }
} catch (error) {
  console.error("❌ Ошибка:", error);
  process.exit(1);
}
