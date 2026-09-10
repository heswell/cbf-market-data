# Market Depth exercise

This repository is a front-end training exercise for web developers. It is the
starting point, not the finished application.

Your task is to replace the placeholder in
`src/components/market-depth/MarketDepthFeature.tsx` with a market-depth
component that renders the same live tabular data as the table above it. Use
[`public/market-depth.png`](public/market-depth.png) as the visual reference.

![Market depth reference](public/market-depth.png)

The finished component should present the top 10 price levels of market depth.
It must remain connected to the existing live data source: quantity bars should
grow and shrink as quantities update, and direction arrows should change between
up and down as prices move.

## Running the application

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Vite prints the local URL to open, normally `http://localhost:5173`. Changes to
source files are applied through hot module replacement.

Other useful commands:

```bash
npm run lint    # run ESLint
npm run build   # type-check and create a production build
npm run preview # serve the production build locally
```

## How the starter application works

The application uses React, TypeScript, Vite, and Vuu. `src/main.tsx` loads the
Vuu styles, creates the React root, and wraps the application in
`TestDataProvider`.

`TestDataProvider` uses Vuu's `LocalDataSourceProvider`. Importing
`src/data/algo-module.ts` registers the local `ALGO` module, which exposes the
`prices` table. No server is required for this exercise.

The source table is defined in `src/data/pricesTable.ts`:

- `generateMarketDepth('VOD.L')` creates the initial rows.
- `MarketDataGenerator` updates those rows every 250 ms after a consumer
  subscribes.
- The schema in `src/data/algo-schemas.ts` defines the columns: `bid`,
  `bidQuantity`, `level`, `offer`, `offerQuantity`, `symbol`, and
  `symbolLevel`.

`src/components/prices-table/PricesTable.tsx` is an example consumer. It obtains
Vuu's `VuuDataSource` constructor with `useData()`, creates a data source for
`ALGO/prices`, and renders it with Vuu's `Table`. The table has zebra stripes
and column separators enabled in its `TableConfig`.

`src/App.tsx` places the Vuu `Shell` around the app. The initial workspace is
described by `src/layoutJSON.ts`, which registers and arranges the table and
the `MarketDepthFeature` placeholder in vertically resizable views.

## Implementing the market-depth component

Start in `src/components/market-depth/MarketDepthFeature.tsx`. The component
should subscribe to `ALGO/prices` rather than duplicating or polling the data
generator. Reuse the existing Vuu data-source context and the same table
identity used by `PricesTable`.

Suggested approach:

1. Create a Vuu data source for the `ALGO/prices` table, requesting only the
   fields the display needs.
2. Use the appropriate Vuu React data hook to subscribe to rows and re-render
   when updates arrive.
3. Limit the display to the first 10 levels and render bid and offer quantities,
   prices, and directional indicators.
4. Derive each quantity bar's width from its quantity relative to the largest
   visible quantity. Do not hard-code widths.
5. Retain the previous bid and offer prices in component state or a ref so each
   update can be classified as up, down, or unchanged before selecting the
   arrow treatment.
6. Add component-scoped styles alongside the feature and use the image as the
   guide for spacing, colour, typography, alignment, and bar layering.

Keep the existing table in place while developing: it is the easiest way to
inspect the live rows and verify that the new component represents the same
data. The feature should handle its initial loading state and avoid assumptions
about a fixed update cadence.

## Tooling overview

| Tool | Role |
| --- | --- |
| [Vite](https://vite.dev/) | Development server, hot module replacement, and production bundling |
| [TypeScript](https://www.typescriptlang.org/) | Static type checking during `npm run build` |
| [React](https://react.dev/) | Component rendering and state management |
| [Vuu](https://vuu.io/) | Data-source context, live table subscriptions, layout shell, table, icons, and theme |
| [Salt](https://salt-ds.com/) | Design-system primitives used by Vuu |
| [ESLint](https://eslint.org/) | Source-code linting |

The dependencies are locked in `package-lock.json`. Use `npm install` so your
local environment matches the exercise configuration.
