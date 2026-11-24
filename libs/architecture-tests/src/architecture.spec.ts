import { projectFiles } from 'archunit';

// `nx test` startet im Projektordner. Die Muster gelten relativ zur tsconfig, also zum Workspace-Root.
const tsConfig = '../../tsconfig.base.json';

describe('architecture', () => {
  it('has no circular dependencies', async () => {
    const rule = projectFiles(tsConfig).inFolder('libs/**').should().haveNoCycles();

    await expect(rule).toPassAsync();
  });

  it('feature-books does not depend on feature-dashboard', async () => {
    const rule = projectFiles(tsConfig)
      .inFolder('libs/feature-books/**')
      .shouldNot()
      .dependOnFiles()
      .inFolder('libs/feature-dashboard/**');

    await expect(rule).toPassAsync();
  });
});
