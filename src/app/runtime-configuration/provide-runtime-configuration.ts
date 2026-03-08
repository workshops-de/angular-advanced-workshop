import { HttpClient } from '@angular/common/http';
import { inject, provideAppInitializer } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiEndpointsConfiguration } from './api-endpoints-configuration';
import { RuntimeConfiguration } from './runtime-configuration';

export function provideRuntimeConfiguration() {
  return provideAppInitializer(async () => {
    const http = inject(HttpClient);
    const runtimeConfiguration = inject(RuntimeConfiguration);

    const configuration = await firstValueFrom(
      http.get<{ apiEndpoints: ApiEndpointsConfiguration }>('/assets/configuration/api-endpoints.json')
    );

    runtimeConfiguration.apiEndpoints.set(configuration.apiEndpoints);
    console.log(runtimeConfiguration.apiEndpoints());
  });
}
