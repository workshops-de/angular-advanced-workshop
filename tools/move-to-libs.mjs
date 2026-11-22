// Moves the code of bookmonkey-client into the generated libraries.
// Usage: node tools/move-to-libs.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const APP = 'apps/bookmonkey-client/src/app';
const WS = `${APP}/workshop-support`;

const git = (...args) => execFileSync('git', args, { stdio: 'inherit' });
const edit = (file, fn) => writeFileSync(file, fn(readFileSync(file, 'utf8')));

// 1. Move the files (git mv keeps the history)
git('rm', '-q', `${WS}/books/book.ts`, `${WS}/public_api.ts`);

mkdirSync('libs/core/src/lib', { recursive: true });
mkdirSync('libs/util/src/lib', { recursive: true });

git('mv', `${WS}/notifications`, 'libs/core/src/lib/notifications');
git('mv', `${WS}/shell/sidebar`, 'libs/ui/src/lib/sidebar');
git('mv', `${WS}/shell/welcome`, 'libs/feature-dashboard/src/lib/welcome');
git('mv', `${WS}/books`, 'libs/util/src/lib/books');
git('mv', `${WS}/README.md`, 'libs/README.md');

for (const entry of readdirSync(`${APP}/books`)) {
  git('mv', join(`${APP}/books`, entry), `libs/feature-books/src/lib/${entry}`);
}
rmSync(WS, { recursive: true, force: true });

// 2. Public API of every library
const index = {
  core:
    "export { Notifier } from './lib/notifications/notifier';\n" +
    "export type { Notification, NotificationKind } from './lib/notifications/notifier';\n",
  ui: "export { Sidebar } from './lib/sidebar/sidebar';\n",
  util:
    "export { bookMatches } from './lib/books/book-matches';\n" +
    "export { classifyMarkSegments } from './lib/books/classify-mark-segments';\n",
  'feature-dashboard': "export { Welcome } from './lib/welcome/welcome';\n",
  'feature-books': "export { bookRoutes } from './lib/book.routes';\n"
};
for (const [lib, content] of Object.entries(index)) {
  writeFileSync(`libs/${lib}/src/index.ts`, content);
}

// 3. Replace the old alias with the library aliases
const swap = (file, lib) => edit(file, s => s.replace("'@workshop-support'", `'@bookmonkey/${lib}'`));
swap('libs/feature-books/src/lib/book-marker.ts', 'util');
swap('libs/feature-books/src/lib/books-page/books-page.ts', 'util');
swap(`${APP}/app.ts`, 'ui');
swap(`${APP}/lib/error-interceptor.ts`, 'core');
swap(`${APP}/app.routes.ts`, 'feature-dashboard');

edit(`${APP}/app.routes.ts`, s =>
  s.replace("import('./books/book.routes')", "import('@bookmonkey/feature-books')")
);

// 4. Remove the old alias from the tsconfig
const base = JSON.parse(readFileSync('tsconfig.base.json', 'utf8'));
delete base.compilerOptions.paths['@workshop-support'];
writeFileSync('tsconfig.base.json', JSON.stringify(base, null, 2) + '\n');

execFileSync('npx', ['prettier', '--write', 'libs', 'tsconfig.base.json'], {
  stdio: 'inherit',
  shell: process.platform === 'win32'
});
console.log('\nCode moved. Next: npx nx run-many -t build test');
