import {
  withNativeFederation,
  fromPackageJson,
  shareAngularLocales
} from '@angular-architects/native-federation/config';

export default withNativeFederation({
  name: 'bookmonkey-client',

  //shareScope: autoShareScope({level: 'minor'}),

  shared: fromPackageJson({
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
    build: 'package'
  })
    .patch(['@angular/*'], { includeSecondaries: { keepAll: true } })
    // bootstrap.ts registers the German locale data, so it has to be part of the import map.
    .override(shareAngularLocales(['de'])),

  //sharedMappings: mappingsFromWorkspace({ singleton: true }).filter(['@my-org/*']).get(),

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // The host uses @angular/cdk, so `keepAll` bundles every entry point. This one is Node-only (schematics).
    '@angular/cdk/schematics'
  ],

  // Please read our docs about configuring native federation:
  // https://native-federation.com/docs/v4/angular-adapter/configuration/

  features: {
    denseChunking: true,
    denseExternals: true,
    strictImports: false
  }
});
