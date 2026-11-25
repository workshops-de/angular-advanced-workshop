import {
  withNativeFederation,
  fromPackageJson
} from '@angular-architects/native-federation/config';

export default withNativeFederation({
  name: 'rating',

  exposes: {
    './RatingElement': './apps/rating/src/app/rating/rating-element.ts'
  },

  //shareScope: autoShareScope({level: 'minor'}),

  shared: fromPackageJson({
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
    build: 'package'
  }).patch(['@angular/*'], { includeSecondaries: { keepAll: true } }),

  //sharedMappings: mappingsFromWorkspace({ singleton: true }).filter(['@my-org/*']).get(),

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // The Web Component brings its own Angular and RxJS. Nothing of it is shared with the host,
    // so host and remote may use different Angular versions.
    /^@angular\//,
    /^rxjs/
  ],

  // Please read our docs about configuring native federation:
  // https://native-federation.com/docs/v4/angular-adapter/configuration/

  features: {
    denseChunking: true,
    denseExternals: true,
    strictImports: false
  }
});
