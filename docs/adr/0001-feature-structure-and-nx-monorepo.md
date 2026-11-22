# ADR 0001: Feature-Based Structure and Nx Mono-Repo

**Status:** Accepted
**Last Update:** 2026/11/22

## Context

The Bookmonkey client grows. A second app (`rating`) already exists and is integrated as a micro frontend. Several teams will work on the same code base. We need a structure that:

- Keeps code that changes together in one place, so a feature can be changed without touching the whole code base
- Makes dependencies between parts of the code visible and enforceable
- Shares code between apps without publishing packages
- Keeps build and test times low when only a small part of the code changed

## Considered Options

### Code structure

| Option             | Description                                                             | Downsides                                                                                |
| ------------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Layers**         | Folders by technical type (`components/`, `services/`, `models/`)       | One feature is spread over many folders; every change touches all layers; no clear owner |
| **Feature slices** | Folders by use case (`view-books`, `edit-book`), shared code in `data/` | Needs a decision where shared code lives; slices must not import each other              |

### Repository layout

| Option                 | Description                                                    | Downsides                                                                                    |
| ---------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Multi-repo**         | One repository per app or library                              | Shared code needs versioning and publishing; changes across repos need several pull requests |
| **Mono-repo, no tool** | One repository, plain Angular CLI workspace                    | No dependency graph, no caching, every change builds and tests everything                    |
| **Mono-repo with Nx**  | One repository, Nx for graph, cache, generators and lint rules | Team has to learn Nx; additional tooling to keep up to date                                  |

## Decision

1. **Feature slices.** Code is structured by feature, not by layer. Each feature owns its components. Shared code lives in `data-access`, `ui` and `util` parts.
2. **Mono-repo with Nx.** Apps live in `apps/`, libraries in `libs/`. Nx provides the project graph, caching, `nx affected` and module boundary rules.
3. **Rules in code.** Boundaries between features and layers are enforced with Nx tags and lint rules, not by convention only.

## Consequences

- **Locality** — A change to one feature stays inside its slice.
- **Visible dependencies** — `nx graph` shows how apps and libraries depend on each other.
- **Faster pipelines** — Caching and `nx affected` skip work for unchanged projects.
- **Shared code without publishing** — Apps import libraries directly from the same repository.
- **Trade-off** — The team has to learn Nx and keep its versions aligned with Angular.
- **Follow-up** — Tags and `depConstraints` for the module boundaries are added to this ADR once they are defined.
