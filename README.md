# ShopCart — Modern Client-Side State Management in React

ShopCart is a React + TypeScript storefront foundation built with Vite. This
baseline includes a product catalog served by a local json-server API, shared
domain types, and the initial catalog/cart UI. The cart currently uses local
component state; the Context, Zustand, Jotai, and XState implementations are
developed in their respective assignment branches.

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
