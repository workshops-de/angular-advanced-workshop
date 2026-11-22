// Generates the workshop libraries with the Nx Angular library generator.
// Usage: npm run task:generate-libs
import { execSync } from 'node:child_process';
import { copyFileSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const libs = [
  { name: 'core', tags: 'type:core' },
  { name: 'ui', tags: 'type:ui' },
  { name: 'util', tags: 'type:util' },
  { name: 'feature-dashboard', tags: 'type:feature,scope:dashboard' },
  { name: 'feature-books', tags: 'type:feature,scope:books' }
];

const run = command => execSync(command, { stdio: 'inherit' });

// 1. Generate the libraries
for (const { name, tags } of libs) {
  run(
    `npx nx g @nx/angular:library --name=${name} --directory=libs/${name} ` +
      `--importPath=@bookmonkey/${name} --tags=${tags} --prefix=app ` +
      `--unitTestRunner=vitest-analog --skipPackageJson --skipFormat --no-interactive`
  );
}

for (const { name } of libs) {
  // 2. Remove the sample component the generator adds
  rmSync(`libs/${name}/src/lib/${name}`, { recursive: true, force: true });

  // 3. Use the same test setup as the app
  copyFileSync('apps/bookmonkey-client/src/test-setup.ts', `libs/${name}/src/test-setup.ts`);

  // 4. Run the library tests in the browser like the app does
  const configPath = `libs/${name}/vite.config.mts`;
  const config = readFileSync(configPath, 'utf8')
    .replace(
      "import angular from '@analogjs/vite-plugin-angular';",
      "import angular from '@analogjs/vite-plugin-angular';\n" +
        "import { playwright } from '@vitest/browser-playwright';\n" +
        "import { join } from 'node:path';"
    )
    .replace(
      'plugins: [angular()]',
      "plugins: [angular({ tsconfig: join(import.meta.dirname, 'tsconfig.spec.json') })]"
    )
    .replace(
      "environment: 'jsdom',",
      'passWithNoTests: true,\n' +
        '    browser: {\n' +
        '      enabled: true,\n' +
        '      provider: playwright(),\n' +
        "      instances: [{ browser: 'chromium' }]\n" +
        '    },'
    );
  writeFileSync(configPath, config);
}

// 5. Keep one @nx/vitest plugin entry that only covers the libraries
const nx = JSON.parse(readFileSync('nx.json', 'utf8'));
nx.plugins = [{ plugin: '@nx/vitest', include: ['libs/**/*'], options: { testTargetName: 'test' } }];
writeFileSync('nx.json', JSON.stringify(nx, null, 2) + '\n');

run('npx prettier --write libs nx.json tsconfig.base.json');
console.log('\nLibraries generated. Next: npm run task:move-to-libs');
