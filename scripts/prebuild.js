const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "..", "public_original");
const targetDir = path.join(__dirname, "..", "public");
const PUBLIC_DIR = path.join(process.cwd(), "public");

if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}

fs.mkdirSync(PUBLIC_DIR, { recursive: true });

if (fs.existsSync(sourceDir)) {
  fs.mkdirSync(targetDir, { recursive: true });

  function copyDir(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  copyDir(sourceDir, targetDir);
} else {
  fs.mkdirSync(targetDir, { recursive: true });
}
