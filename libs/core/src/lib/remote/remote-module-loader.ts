import { InjectionToken } from '@angular/core';

/** Loads an exposed module of a remote, e.g. `loader('rating', './Rating')`. */
export type RemoteModuleLoader = <T = unknown>(
  remoteName: string,
  exposedModule: string
) => Promise<T>;

/**
 * The loader is provided by the host's `bootstrap.ts`: it comes from the result of `initFederation()`.
 * Components inject it instead of importing the global (deprecated) `loadRemoteModule`.
 */
export const REMOTE_MODULE_LOADER = new InjectionToken<RemoteModuleLoader>('REMOTE_MODULE_LOADER');
