import fs from 'node:fs';
import path from 'node:path';

const folder = path.resolve('public/haircuts');
const output = path.resolve('src/haircuts-manifest.json');

const extensions = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif',
]);

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder, { recursive: true });
}

const files = fs
  .readdirSync(folder, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((name) => extensions.has(path.extname(name).toLowerCase()))
  .sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  );

fs.writeFileSync(output, JSON.stringify(files, null, 2));

console.log(`Found ${files.length} haircut photos.`);