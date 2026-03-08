# ADR: Runtime Configuration Loading

**Status:** Accepted
**Last Update:** 2026/3/5

## Context

Angular applications often need environment-specific configuration (API endpoints, feature flags, etc.). Build-time configuration forces a separate build per deployment stage, increasing build and release overhead. We needed a solution that:

- Avoids boilerplate for safe access (no repeated null checks or fallbacks)
- Enables the same build to run in any stage (dev, staging, prod) by swapping configuration at deployment time
- Provides type-safe access to configuration values

## Considered Options

| Option               | Description                                                          | Downsides                                                                                                                |
| -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Load when needed** | Fetch configuration on first use (e.g. when an API client is called) | RxJS pipeline needed; pipeline code scattered across consumers; slightly longer wait for first request; caching required |
| **APP_INITIALIZER**  | Load configuration before the app bootstraps                         | Blocks startup until fetch completes                                                                                     |

## Decision

We load configuration at runtime via an `APP_INITIALIZER` and expose it through a typed, signal-based service:

1. **External JSON file** — Configuration lives in `/assets/configuration/api-endpoints.json`, deployed per environment without recompiling.
2. **App initializer** — `provideRuntimeConfiguration()` uses `provideAppInitializer()` to fetch the JSON via `HttpClient` before the app bootstraps.
3. **Typed service** — `RuntimeConfiguration` holds typed signals (e.g. `apiEndpoints`) with interfaces such as `ApiEndpointsConfiguration`, ensuring compile-time safety.
4. **Simple injection** — Consumers inject `RuntimeConfiguration` and read values directly (e.g. `runtimeConfiguration.apiEndpoints().books`) with no boilerplate.

## Consequences

- **Promotes deployment stages** — One build, different config files per environment; no rebuilds for stage changes.
- **Type-safe access** — Interfaces and signals prevent typos and wrong types at compile time.
- **Safe access without boilerplate** — Config is loaded before the app runs, so values are available when needed; no null checks in normal flow.
- **Trade-off** — Configuration is not available before the initializer completes; blocking startup is acceptable for our use case, because the configuration is hosted on the same web-server (fast response).
