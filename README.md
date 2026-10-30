# ShopCart — Modern Client-Side State Management in React

ShopCart is a React + TypeScript storefront built with Vite. On the
`deliverable-4-xstate` branch, Zustand owns cart state while a shared XState v5
actor coordinates checkout, including payment request cancellation and cart
synchronization.

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
