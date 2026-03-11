import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideFailureStore } from '@common-components';
import { routes } from './app.routes';
import { provideRuntimeConfiguration } from './runtime-configuration/provide-runtime-configuration';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes, withComponentInputBinding()),
    provideRuntimeConfiguration(),
    provideFailureStore()
  ]
};
