import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { bootstrapApplication } from '@angular/platform-browser';
import { REMOTE_MODULE_LOADER, RemoteModuleLoader } from '@bookmonkey/core';
import { App } from './app/app';
import { appConfig } from './app/app.config';

registerLocaleData(localeDe);

export function bootstrap(loadRemoteModule: RemoteModuleLoader) {
  return bootstrapApplication(App, {
    ...appConfig,
    providers: [
      ...appConfig.providers,
      { provide: REMOTE_MODULE_LOADER, useValue: loadRemoteModule }
    ]
  }).catch(err => console.error(err));
}
