// Sets up ESLint for the Nx workspace and tags the apps.
// Usage: npm run task:setup-lint
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const run = command => execSync(command, { stdio: 'inherit' });

// 1. Register the Nx ESLint plugin. It infers a "lint" target for every project.
run('npx nx g @nx/eslint:init --skipPackageJson --no-interactive');

// 2. Write the baseline config. It contains no module boundary rule yet.
writeFileSync(
  'eslint.config.mjs',
  `import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/.angular', '**/.nx', '**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*']
  },
  {
    // Not the topic of this task: keep the baseline green so that boundary violations stand out.
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': 'off',
      '@angular-eslint/directive-selector': 'off'
    }
  },
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/elements-content': 'off',
      '@angular-eslint/template/eqeqeq': 'off'
    }
  }
];
`
);

// 3. Tag the apps, so that rules can tell them from libraries.
for (const app of ['bookmonkey-client', 'rating']) {
  const file = `apps/${app}/project.json`;
  const project = JSON.parse(readFileSync(file, 'utf8'));
  project.tags = ['type:app'];
  writeFileSync(file, JSON.stringify(project, null, 2) + '\n');
}

run('npx prettier --write nx.json eslint.config.mjs apps/*/project.json .vscode/extensions.json');
