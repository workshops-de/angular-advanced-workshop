import { initFederation } from '@angular-architects/native-federation';

async function main() {
  const { loadRemoteModule } = await initFederation('federation.manifest.json', {
    hostRemoteEntry: { url: './remoteEntry.json' }
  });
  const { bootstrap } = await import('./bootstrap');
  await bootstrap(loadRemoteModule);
}

main().catch(err => console.error(err));
