const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(process.cwd(), "out");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const ORIGINAL_PUBLIC_DIR = path.join(process.cwd(), "public_original");

try {
  if (fs.existsSync(OUT_DIR)) {
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
  }

  if (fs.existsSync(ORIGINAL_PUBLIC_DIR)) {
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
  }

  if (fs.existsSync(PUBLIC_DIR)) {
    if (fs.existsSync(OUT_DIR)) {
      fs.rmSync(OUT_DIR, { recursive: true, force: true });
    }
  }
} catch {
  process.exit(1);
}
