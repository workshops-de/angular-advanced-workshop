# ADR 0002: Runtime Configuration per Feature Slice

**Status:** Accepted
**Last Update:** 2026/11/22

## Context

The books client calls a backend whose address differs per stage (local, test, production). The address was a constant in `BooksClient`, so every stage needed its own build. We want one build artifact that runs on every stage.

- The configuration must be changeable after the build, for example by the CI pipeline
- Several parts of the application may need configuration, each with its own keys
- A feature slice must not depend on how another slice is configured

## Considered Options

| Option                       | Description                                                | Downsides                                                                     |
| ---------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Build-time `environment`** | Values are replaced during the build                       | One build per stage; the tested artifact is not the deployed one              |
| **Global JSON for the app**  | One `config.json`, read by the app and handed to all parts | Every slice depends on one shared contract; changes in one slice touch others |
| **One JSON per slice**       | Each slice owns a file and a schema and reads it itself    | One request per slice; the pipeline has to know the file names                |

## Decision

1. **One JSON file per slice**, stored in `public/config/` of the root app, for example `config/books.json`. The file is copied unchanged into the build output.
2. **The slice reads its own file** with `httpResource` in an own service (`BooksConfig` in `feature-books`). Other slices bring their own file and service.
3. **A Valibot schema validates the file.** `BooksConfigSchema` requires `apiUrl` to be a valid URL. A missing or invalid file fails with a clear error.
4. **The consumer uses the resource directly.** `BooksClient` reads `config.value()?.apiUrl`. Its own resources stay idle until the configuration is loaded. The app does not import the slice statically, so lazy loading and the module boundaries stay intact.

## Consequences

- **One artifact for all stages** — The pipeline replaces `config/books.json` in the build output, no rebuild needed.
- **Slice autonomy** — The slice owns file name, schema and service. Nothing is shared between slices.
- **Validated input** — A typo in the pipeline puts the configuration resource into the error state and no request is sent.
- **Trade-off** — One extra request per slice when the area is opened first.
- **Trade-off** — The file is outside the type system. Schema and file must be kept in sync.
