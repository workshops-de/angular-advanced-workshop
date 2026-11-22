<h1 align="center">Angular Advanced Intensive Workshop</h1>

<p align="center">
  <img alt="workshops-de-logo-blue" src="docs/logo-workshops-de.png" width="120">
  <br>
  <em>The best way to accelerate your Angular skills</em>
  <br>
</p>

<p align="center">
  <a href="https://workshops.de/seminare-schulungen-kurse/angular-advanced" target="_blank"><strong>workshops.de</strong></a>
  <br>
</p>

## Workspace Layout

| Project             | Path                          | Description                                                         |
| ------------------- | ----------------------------- | ------------------------------------------------------------------- |
| `bookmonkey-client` | `projects/bookmonkey-client`  | The workshop app (Angular 22)                                       |
| `rating`            | `projects/rating`             | Small 5-star rating app, **Native Federation remote** (port `4201`) |

The `rating` app exposes its `Rating` component (`<rating-stars>`) as `./Rating`
(see `projects/rating/federation.config.mjs`). Its manifest is served at http://localhost:4201/remoteEntry.json.

## Local Development

| Command                | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `npm install`          | Installs the packages                               |
| `npm start`            | Starts `bookmonkey-client` (http://localhost:4200)  |
| `npm run start:rating` | Starts the `rating` remote (http://localhost:4201)  |
| `npm run start:all`    | Starts both apps                                    |
| `npm test`             | Runs tests for `bookmonkey-client`                  |
| `npm run test:rating`  | Runs tests for `rating`                             |
| `npm run build`        | Builds `bookmonkey-client`                          |
| `npm run build:rating` | Builds the `rating` remote                          |

## The API

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `npx bookmonkey-api` | Installs and starts the HTTP API "Bookmonkey API" |

The API provides fake data that you can use in your Angular application.

> [!NOTE]
> The API starts at http://localhost:4730.
> When you open this page, you’ll find documentation for all endpoints. 🚀
