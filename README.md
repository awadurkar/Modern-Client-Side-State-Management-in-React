# ShopCart — Modern Client-Side State Management in React

ShopCart is a React + TypeScript storefront built with Vite. The
`deliverable-1-context` branch implements the catalog and cart with split React
state/dispatch contexts and a pure `useReducer` cart reducer. The dispatch-only
product controls consume a stable dispatch context, separate from cart state.

## Requirements

- Node.js 18 or newer
- npm

## Getting started

Install dependencies:

```sh
npm install
```

Run the frontend and mock API in separate terminals:

```sh
npm run dev
```

```sh
npm run server
```

The storefront runs at [http://localhost:5173](http://localhost:5173). The
mock API listens on port 3001, and Vite proxies `/api/*` requests to it. The
API intentionally adds a 1.5-second delay to each response.

## Build

```sh
npm run build
```

The mock catalog and empty orders collection are in [`db.json`](./db.json).
# Modern-Client-Side-State-Management-in-React
